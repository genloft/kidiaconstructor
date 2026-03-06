import { browser } from '$app/environment';
import type { GameState } from '../types';
import { INITIAL_METRICS, getUnlockedPieces } from './rules';

const STORAGE_KEY = 'kidia-state-v1';
const CURRENT_VERSION = 1;

export const DEFAULT_STATE: GameState = {
    version: CURRENT_VERSION,
    currentStage: 1,
    unlockedPieces: getUnlockedPieces(1),
    placements: {
        Datos: undefined,
        Cerebro: undefined,
        Entrenamiento: undefined,
    },
    hasSeenIntroTour: false,
    baseMetrics: { ...INITIAL_METRICS },
    logs: []
};

// Guardas SSR: usar funciones de storage seguras
export function saveState(state: GameState): void {
    if (browser) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn('Falló el localStorage', e);
        }
    }
}

export function loadState(): GameState {
    if (browser) {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved) as Partial<GameState>;

                // Migración simple o fallback si la versión no coincide o hay fallos
                if (parsed.version === CURRENT_VERSION) {
                    // Merge with default to handle missing keys
                    return {
                        ...DEFAULT_STATE,
                        ...parsed,
                        placements: { ...DEFAULT_STATE.placements, ...parsed.placements }
                    };
                }
            }
        } catch (e) {
            console.warn('Estado localStorage corrupto, reiniciando...', e);
        }
    }
    return { ...DEFAULT_STATE };
}

export function clearState(): void {
    if (browser) {
        localStorage.removeItem(STORAGE_KEY);
    }
}
