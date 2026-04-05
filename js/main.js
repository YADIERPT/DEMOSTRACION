/* ============================================
   MAIN JS - Funciones compartidas para minijuegos
   ============================================ */

// ============================================
// SISTEMA DE FICHAS
// ============================================

const ChipsSystem = {
    KEY: 'casino_chips',
    LOAN_KEY: 'casino_loans_count',
    DEFAULT_CHIPS: 1000,
    MAX_LOANS: 3,
    LOAN_AMOUNT: 500,

    init(defaultChips = null) {
        // MIGRACIÓN: Si el usuario ya tiene fichas pero el juego pide un inicio distinto, se respeta el guardado
        // a menos que sea la primera vez que entra al sistema.
        const stored = localStorage.getItem(this.KEY);

        if (stored === null) {
            localStorage.setItem(this.KEY, defaultChips !== null ? defaultChips : this.DEFAULT_CHIPS);
        }
        
        if (localStorage.getItem(this.LOAN_KEY) === null) {
            localStorage.setItem(this.LOAN_KEY, 0);
        }
        
        this.updateDisplay();
    },

    get() {
        return parseInt(localStorage.getItem(this.KEY)) || 0;
    },

    set(amount) {
        localStorage.setItem(this.KEY, amount);
        this.updateDisplay();
    },

    add(amount) {
        const current = this.get();
        this.set(current + amount);
    },

    subtract(amount, allowDebt = true, minDebt = -1000) {
        const current = this.get();
        const newAmount = current - amount;

        if (current < amount && !allowDebt) {
            Notifications.show('FICHAS INSUFICIENTES', 'No tienes suficientes créditos para esta apuesta. Por favor, recarga fichas o solicita un préstamo.', 'warning');
            this.showBankruptWarning();
            return false;
        }
        
        if (newAmount < minDebt) {
            Notifications.show('BANCARROTA CRÍTICA', 'Has alcanzado el límite máximo de deuda del casino (-1000). No puedes seguir apostando hasta que recargues créditos.', 'error');
            return false;
        }

        this.set(newAmount);
        return true;
    },

    getLoansCount() {
        return parseInt(localStorage.getItem(this.LOAN_KEY)) || 0;
    },

    requestLoan() {
        const count = this.getLoansCount();
        if (count >= this.MAX_LOANS) {
            Notifications.show('SIN CRÉDITO', 'Ya has pedido el "Préstamo de Conejita" 3 veces. ¡El casino no confía más en ti!');
            return false;
        }

        localStorage.setItem(this.LOAN_KEY, count + 1);
        this.add(this.LOAN_AMOUNT);
        Notifications.show('¡PRÉSTAMO CONCEDIDO!', `La conejita te ha prestado ${this.LOAN_AMOUNT} fichas. Tu deuda aumenta, ¡úsalo con sabiduría! (Préstamo ${count + 1}/${this.MAX_LOANS})`);
        return true;
    },

    showBankruptWarning() {
        const count = this.getLoansCount();
        const remaining = this.MAX_LOANS - count;
        
        if (remaining > 0) {
            const msg = `No tienes suficientes fichas. ¿Quieres pedir un "Préstamo de Conejita" de ${this.LOAN_AMOUNT}? Te quedan ${remaining} disponibles.`;
            
            // Usar una notificación especial con callback
            this.showLoanPrompt(msg);
        } else {
            Notifications.show('BANCARROTA TOTAL', 'No tienes fichas y has agotado tus préstamos. ¡Usa el sistema de recarga o vuelve mañana!');
        }
    },

    showLoanPrompt(message) {
        this.init();
        const container = document.getElementById('notificationContainer');
        document.getElementById('notifTitle').textContent = '¿NECESITAS AYUDA?';
        document.getElementById('notifMessage').textContent = message;
        
        const btn = container.querySelector('.btn-popup');
        btn.textContent = 'PEDIR PRÉSTAMO';
        btn.onclick = () => {
            if (this.requestLoan()) {
                this.updateDisplay();
                Notifications.hide();
                // Restaurar botón original
                setTimeout(() => {
                    btn.textContent = 'CONFIRMAR';
                    btn.onclick = () => Notifications.hide();
                }, 500);
            }
        };
        
        container.classList.add('active');
    },

    canAfford(amount) {
        return this.get() >= amount;
    },

    reset(defaultChips = null) {
        localStorage.setItem(this.LOAN_KEY, 0);
        this.set(defaultChips !== null ? defaultChips : this.DEFAULT_CHIPS);
    },

    updateDisplay() {
        const displays = document.querySelectorAll('.chips-count');
        const val = this.get();
        displays.forEach(display => {
            if (val < 0) {
                display.style.color = 'var(--nikke-pink)';
                display.innerHTML = `${val} <span style="font-size: 0.6rem; vertical-align: middle; color: var(--nikke-pink); font-weight: 900;">DEUDA</span>`;
            } else {
                display.textContent = val;
                display.style.color = 'var(--nikke-gold)';
            }
        });
    }
};

// ============================================
// ANIMACIONES
// ============================================

const Animations = {
    // Efecto de confeti al ganar
    confetti(duration = 3000) {
        const colors = ['#ff00ff', '#00ffff', '#9d00ff', '#ffcc00', '#ffffff'];
        const container = document.createElement('div');
        container.className = 'confetti';
        document.body.appendChild(container);

        for (let i = 0; i < 60; i++) {
            const confetti = document.createElement('div');
            const isEmoji = Math.random() < 0.2;
            if (isEmoji) {
                confetti.textContent = '🐰';
                confetti.style.fontSize = '20px';
            } else {
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = '10px';
                confetti.style.height = '10px';
            }
            confetti.style.position = 'absolute';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = '-20px';
            confetti.style.opacity = Math.random();
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            container.appendChild(confetti);

            // Animación de caída
            confetti.animate([
                { top: '-20px', opacity: 1 },
                { top: '100vh', opacity: 0 }
            ], {
                duration: duration + Math.random() * 2000,
                easing: 'ease-out'
            });
        }

        setTimeout(() => container.remove(), duration + 2000);
    },

    spawnBunnies() {
        const icons = ['🐰', '🐇', '✨', '💎', '🎰', '🍑', '👯‍♀️'];
        setInterval(() => {
            if (document.hidden) return;
            const item = document.createElement('div');
            item.className = 'bunny-decor';
            item.textContent = icons[Math.floor(Math.random() * icons.length)];
            item.style.left = `${Math.random() * 100}%`;
            item.style.animationDuration = `${8 + Math.random() * 12}s`;
            document.body.appendChild(item);
            setTimeout(() => item.remove(), 20000);
        }, 3000);
    },

    // Efecto de brillo en elemento
    glow(element, duration = 1000) {
        element.classList.add('glow');
        setTimeout(() => element.classList.remove('glow'), duration);
    },

    // Efecto de sacudida
    shake(element, duration = 500) {
        element.style.animation = `shake ${duration}ms ease-in-out`;
        setTimeout(() => element.style.animation = '', duration);
    },

    // Animación de número cambiando
    countUp(element, start, end, duration = 1000) {
        const range = end - start;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(start + range * progress);
            element.textContent = value;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    },

    // Efecto deaparición gradual
    fadeIn(element, duration = 500) {
        element.style.opacity = '0';
        element.style.display = 'block';
        element.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration,
            easing: 'ease-out'
        });
        setTimeout(() => element.style.opacity = '1', duration);
    }
};

// ============================================
// UTILIDADES DE PROBABILIDAD
// ============================================

const Probability = {
    // Generar número aleatorio entre min y max (inclusive)
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Probabilidad de X% (retorna true/false)
    chance(percent) {
        return Math.random() * 100 < percent;
    },

    // Elegir elemento aleatorio de un array
    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    // Barajar array (Fisher-Yates shuffle)
    shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    // Generar resultados según probabilidades
    // weights = [{value: 'A', weight: 50}, {value: 'B', weight: 30}, ...]
    weightedRandom(weights) {
        const totalWeight = weights.reduce((sum, item) => sum + item.weight, 0);
        let random = Math.random() * totalWeight;

        for (const item of weights) {
            random -= item.weight;
            if (random <= 0) return item.value;
        }
        return weights[weights.length - 1].value;
    }
};

// ============================================
// ESTADÍSTICAS Y HISTORIAL
// ============================================

const Stats = {
    // Formatear número con separador de miles
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    // Calcular porcentaje
    percentage(part, total) {
        if (total === 0) return 0;
        return ((part / total) * 100).toFixed(1);
    },

    // Crear historial visual
    createHistoryItem(value, type = 'default') {
        const item = document.createElement('span');
        item.className = `history-item ${type}`;
        item.textContent = value;
        return item;
    },

    // Actualizar estadísticas
    updateStats(element, value) {
        if (typeof value === 'number') {
            element.textContent = this.formatNumber(value);
        } else {
            element.textContent = value;
        }
    }
};

// ============================================
// ALMACENAMIENTO DE SESIÓN POR JUEGO
// ============================================

const GameSession = {
    save(gameId, data) {
        sessionStorage.setItem(`game_${gameId}`, JSON.stringify(data));
    },

    load(gameId) {
        const data = sessionStorage.getItem(`game_${gameId}`);
        return data ? JSON.parse(data) : null;
    },

    clear(gameId) {
        sessionStorage.removeItem(`game_${gameId}`);
    }
};

// ============================================
// SISTEMA DE AUDIO (Manejado por el Contenedor Maestro)
// ============================================

const Sound = {
    init() {
        console.log("Audio persistente activado por el Contenedor Maestro.");
    },
    play(type) {
        // El sonido se delega al padre si existe, o se ignora silenciosamente
        console.log(`[Sound] Solicitado efecto: ${type}`);
        // No hay archivos de sonido individuales cargados, se deja el stub para evitar bloqueos
    },
    playBGM() {},
    toggleMute() {
        if (window.parent && window.parent.toggleMute) {
            window.parent.toggleMute();
        }
    },
    updateMuteUI() {},
    createMuteButton() {}
};

// ============================================
// SISTEMA DE NOTIFICACIONES (Pop-ups)
// ============================================

const Notifications = {
    init() {
        if (!document.getElementById('notificationContainer')) {
            const container = document.createElement('div');
            container.id = 'notificationContainer';
            container.className = 'notification-container';
            container.innerHTML = `
                <div class="nikke-popup">
                    <div class="popup-header">
                        <span class="popup-icon">✨</span>
                        <h2 id="notifTitle">ALERTA</h2>
                    </div>
                    <div class="popup-body">
                        <div id="notifAmount" class="notif-amount"></div>
                        <div id="notifResults" class="notif-results"></div>
                        <p id="notifMessage">Mensaje del sistema...</p>
                    </div>
                    <div class="popup-footer">
                        <button class="btn-popup" onclick="Casino.Notifications.hide()">CONFIRMAR</button>
                    </div>
                </div>
            `;
            document.body.appendChild(container);
        }
        
        if (!document.getElementById('toastContainer')) {
            const toastContainer = document.createElement('div');
            toastContainer.id = 'toastContainer';
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
    },

    toast(message, type = 'info') {
        this.init();
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        // El CSS maneja la animación de salida, pero lo eliminamos del DOM después
        setTimeout(() => toast.remove(), 3000);
        
        // Sonido de alerta corto si es error
        if (type === 'error') Sound.play('error');
    },

    show(title, message, type = 'info', amount = null, results = null) {
        this.init();
        const container = document.getElementById('notificationContainer');
        const popup = container.querySelector('.nikke-popup');
        const amountEl = document.getElementById('notifAmount');
        const resultsEl = document.getElementById('notifResults');
        const iconEl = container.querySelector('.popup-icon');
        
        document.getElementById('notifTitle').textContent = title;
        document.getElementById('notifMessage').textContent = message;
        
        // Manejo del Monto
        if (amount !== null) {
            const prefix = amount > 0 ? '+' : '';
            amountEl.textContent = `${prefix}${amount} FICHAS`;
            amountEl.style.display = 'block';
            amountEl.className = 'notif-amount ' + (amount > 0 ? 'gain' : 'loss');
        } else {
            amountEl.style.display = 'none';
        }

        // Manejo de Resultados Múltiples (Cuadrícula con Animación)
        resultsEl.innerHTML = '';
        if (results && Array.isArray(results)) {
            resultsEl.style.display = 'grid';
            results.forEach((res, index) => {
                const item = document.createElement('div');
                const rarity = res.type || '';
                item.className = `result-dot ${rarity} reveal`;
                item.setAttribute('data-rarity', rarity);
                
                // NUEVO: Soporte para imágenes en el pop-up
                if (res.img) {
                    const img = document.createElement('img');
                    img.src = res.img;
                    img.style.width = '85%'; // Un poco más pequeña
                    img.style.height = '85%';
                    img.style.objectFit = 'contain'; // Que no se estire
                    img.style.borderRadius = '4px';
                    img.style.margin = 'auto';
                    item.appendChild(img);
                } else {
                    item.textContent = res.icon || res;
                }
                
                // Retraso secuencial (0.15s por elemento)
                item.style.animationDelay = `${index * 0.15}s`;
                
                resultsEl.appendChild(item);
            });
        } else {
            resultsEl.style.display = 'none';
        }

        // Icono según tipo
        const icons = { 'win': '🎰', 'loss': '💀', 'info': '📡', 'warning': '⚠️', 'error': '🚫' };
        iconEl.textContent = icons[type] || '✨';
        
        popup.className = 'nikke-popup ' + type;
        container.classList.add('active');
        
        if (type === 'win') Sound.play('win');
        else if (type === 'loss' || type === 'error') Sound.play('loss');
        else Sound.play('popup');
    },

    // NUEVO: Números flotantes en la posición del cursor o elemento
    showFloatingText(text, type = 'gain', event = null) {
        const floating = document.createElement('div');
        floating.className = `floating-text ${type}`;
        floating.textContent = text;
        
        // Posicionamiento
        let x, y;
        if (event && event.clientX) {
            x = event.clientX;
            y = event.clientY;
        } else {
            x = window.innerWidth / 2;
            y = window.innerHeight / 2;
        }

        floating.style.left = `${x}px`;
        floating.style.top = `${y}px`;
        
        document.body.appendChild(floating);
        
        // Eliminar después de la animación
        setTimeout(() => floating.remove(), 2000);
    },

    hide() {
        const container = document.getElementById('notificationContainer');
        if (container) {
            container.classList.remove('active');
        }
    }
};

// ============================================
// SISTEMA DE RECARGA (Tarjeta de Crédito)
// ============================================

const RechargeSystem = {
    init() {
        if (!document.getElementById('rechargeModal')) {
            const modal = document.createElement('div');
            modal.id = 'rechargeModal';
            modal.className = 'notification-container';
            modal.innerHTML = `
                <div class="nikke-popup recharge-card">
                    <h2 class="neon-text-gold">RECARGA DE CRÉDITOS</h2>
                    <p>Introduce los datos de tu tarjeta de crédito</p>
                    
                    <div class="credit-card-form">
                        <div class="form-group">
                            <label>NÚMERO DE TARJETA</label>
                            <input type="text" placeholder="XXXX XXXX XXXX XXXX" maxlength="19" id="cardNum" style="width: 100%; padding: 0.8rem; background: rgba(0,0,0,0.5); border: 1px solid var(--nikke-cyan); color: white; margin-bottom: 1rem;">
                        </div>
                        <div style="display: flex; gap: 10px;">
                            <div class="form-group" style="flex: 1;">
                                <label>EXPIRACIÓN</label>
                                <input type="text" placeholder="MM/YY" maxlength="5" id="cardExp" style="width: 100%; padding: 0.8rem; background: rgba(0,0,0,0.5); border: 1px solid var(--nikke-cyan); color: white; margin-bottom: 1rem;">
                            </div>
                            <div class="form-group" style="flex: 1;">
                                <label>CVC</label>
                                <input type="password" placeholder="***" maxlength="3" id="cardCvc" style="width: 100%; padding: 0.8rem; background: rgba(0,0,0,0.5); border: 1px solid var(--nikke-cyan); color: white; margin-bottom: 1rem;">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>CANTIDAD A RECARGAR</label>
                            <select id="rechargeAmount" style="width: 100%; padding: 0.8rem; background: rgba(0,0,0,0.5); border: 1px solid var(--nikke-cyan); color: white; margin-bottom: 1rem;">
                                <option value="500">500 FICHAS - $4.99</option>
                                <option value="1000">1000 FICHAS - $8.99</option>
                                <option value="5000">5000 FICHAS - $39.99</option>
                            </select>
                        </div>
                    </div>

                    <div style="display: flex; gap: 10px; justify-content: center; margin-top: 1rem;">
                        <button class="btn-popup" id="btnProcessPayment" onclick="Casino.Recharge.process()">PROCESAR PAGO</button>
                        <button class="btn-popup" style="background: var(--nikke-purple);" onclick="Casino.Recharge.hide()">CANCELAR</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
    },

    show() {
        this.init();
        document.getElementById('rechargeModal').classList.add('active');
    },

    hide() {
        const modal = document.getElementById('rechargeModal');
        if (modal) modal.classList.remove('active');
    },

    process() {
        const btn = document.getElementById('btnProcessPayment');
        const amount = parseInt(document.getElementById('rechargeAmount').value);
        
        btn.textContent = 'PROCESANDO...';
        btn.disabled = true;

        setTimeout(() => {
            ChipsSystem.add(amount);
            this.hide();
            Notifications.show('PAGO EXITOSO', `Se han añadido ${amount} fichas a tu cuenta. ¡Gracias por tu compra!`);
            btn.textContent = 'PROCESAR PAGO';
            btn.disabled = false;
        }, 2000);
    }
};

// ============================================
// EXPORTACIÓN GLOBAL
// ============================================

window.Casino = {
    Chips: ChipsSystem,
    Animations,
    Probability,
    Stats,
    Session: GameSession,
    Sound,
    Notifications,
    Recharge: RechargeSystem
};

// ============================================
// INICIALIZACIÓN AUTOMÁTICA
// ============================================

// Iniciar sistemas inmediatamente (antes del DOM para ganar tiempo)

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar sistemas base
    Notifications.init();
    RechargeSystem.init();
    Sound.init();

    // Iniciar BGM (maneja autoplay automáticamente)
    Sound.playBGM();

    // Sincronizar fichas
    Casino.Chips.init();
    
    // Efectos de fondo
    Animations.spawnBunnies();
});