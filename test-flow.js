import { game, gameMetrics } from './src/lib/stores/game.js';
import { get } from 'svelte/store';

console.log('--- STARTING KIDIA SIMULATION ---');
console.log('Initial State:', get(game).currentStage);

// 1. Install prerequisites in Stage 1
console.log('\nAcciones:');
game.placePiece('Input', 'p_data_raw');
game.placePiece('Training', 'p_labels');
game.placePiece('Model', 'p_model_linear');

// Print State
console.log('\nPlacements:', get(game).placements);
console.log('Metrics:', get(gameMetrics));
console.log('Logs:', get(game).logs.map(l => `[${l.type}] ${l.message}`));

// Train to attempt completing stage 1
console.log('\nTraining...');
game.train();

setTimeout(() => {
    console.log('\nPost-Train State:', get(game).currentStage);
    console.log('Post-Train Logs:', get(game).logs.map(l => `[${l.type}] ${l.message}`));
    console.log('--- END SIMULATION ---');
    process.exit(0);
}, 200);
