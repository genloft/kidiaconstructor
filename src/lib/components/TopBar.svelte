<script lang="ts">
    import { currentLanguage, t, type Language } from "../stores/i18n";

    const languages: { code: Language; label: string }[] = [
        { code: "es", label: "🇪🇸 Español" },
        { code: "en", label: "🇬🇧 English" },
        { code: "ru", label: "🇷🇺 Русский" },
    ];

    function changeLang(e: Event) {
        const target = e.target as HTMLSelectElement;
        currentLanguage.set(target.value as Language);
    }
</script>

<header class="top-bar">
    <div class="left-section">
        <!-- Espacio para futuro logo corporativo alternativo o menú hamburguesa -->
    </div>

    <div class="right-section">
        <label for="lang-select" class="sr-only">Seleccionar Idioma</label>
        <div class="lang-wrapper">
            <select
                id="lang-select"
                class="lang-select"
                value={$currentLanguage}
                on:change={changeLang}
                aria-label={$t.language}
            >
                {#each languages as lang}
                    <option value={lang.code}>{lang.label}</option>
                {/each}
            </select>
            <span class="select-icon">▼</span>
        </div>

        <button class="btn-login" disabled>
            {$t.login}
        </button>
    </div>
</header>

<style>
    .top-bar {
        width: 100vw;
        height: 60px;
        background: var(--bg-main);
        border-bottom: 1px solid var(--border-stone);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1.5rem;
        box-sizing: border-box;
        flex-shrink: 0;
        z-index: 100;
    }

    .left-section,
    .right-section {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }

    .lang-wrapper {
        position: relative;
    }

    .lang-select {
        appearance: none;
        background: var(--bg-panel);
        border: 1px solid var(--border-stone);
        border-radius: var(--radius-sm);
        color: var(--text-main);
        font-family: var(--font-body);
        font-size: 0.9rem;
        font-weight: 500;
        padding: 0.4rem 2rem 0.4rem 1rem;
        cursor: pointer;
        transition: all 0.2s;
        outline: none;
    }

    .lang-select:hover {
        border-color: var(--primary);
    }

    .lang-select:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 2px rgba(146, 151, 254, 0.3);
    }

    .lang-select option {
        background: var(--bg-main);
        color: var(--text-main);
    }

    .select-icon {
        position: absolute;
        right: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: var(--text-muted);
        font-size: 0.6rem;
    }

    .btn-login {
        background: transparent;
        border: 1px solid var(--border-highlight);
        color: var(--text-muted);
        border-radius: var(--radius-sm);
        padding: 0.4rem 1rem;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: not-allowed;
        opacity: 0.6;
        transition: all 0.2s;
    }
</style>
