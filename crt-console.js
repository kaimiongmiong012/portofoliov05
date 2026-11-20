/* =========================================================
   KAI-VISION CRT CONSOLE & ROOM 04 POV DIMENSION (V0.5)
   Door-Pull Entry • Responsive Floor Light Beam
   3-Plane First-Person Head-Look Parallax • Lamp Dust Motes
   3-Channel 1980s AFK Broadcast • Subtle Vintage CRT Hum
   Hidden 1980s Digital Alarm Clock • 1.9s ZZZ Static Warp
   ========================================================= */

window.CRTConsole = (function () {
  let audioCtx = null;
  let isMuted = false;
  let activeGame = null;
  let activeCartId = null;
  let selectedCartId = "runner";
  let isTransitioning = false;
  let loungeOpen = false;
  let isIdleBroadcast = true;

  let staticRafId = null;
  let broadcastRafId = null;
  let dustRafId = null;
  let povRafId = null;
  let afkReturnTimer = null;
  let clockIntervalId = null;

  // Ambient 1980s TV hum & gentle static audio nodes
  let ambientNodes = null;

  const CART_ORDER = ["runner", "grimoire", "campus", "monolith"];

  function ensureAudio() {
    if (isMuted) return null;
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) audioCtx = new Ctx();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  /* ---------------------------------------------------------
     PROCEDURAL WEB AUDIO SYNTH API (SHARED ACROSS PORTFOLIO)
     --------------------------------------------------------- */
  function tone(freq = 440, dur = 0.1, type = "triangle", gainVal = 0.06, endFreq = null) {
    const ctx = ensureAudio();
    if (!ctx || isMuted) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(Math.max(30, freq), now);
    if (endFreq && endFreq > 20) {
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + dur);
    }

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(gainVal, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + dur + 0.02);
  }

  function noise(dur = 0.12, gainVal = 0.08, cutoff = 1800) {
    const ctx = ensureAudio();
    if (!ctx || isMuted) return;
    const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - (i / bufferSize) * 0.65);
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = cutoff;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start();
  }

  /* ---------------------------------------------------------
     TACTILE HARDWARE, DOOR & RETRO VHS SOUND EFFECTS
     --------------------------------------------------------- */
  function playKeySwitch(pitchOffset = 0) {
    if (isMuted) return;
    noise(0.032, 0.06, 3200);
    tone(260 + pitchOffset * 45, 0.04, "square", 0.03, 140 + pitchOffset * 20);
    setTimeout(() => {
      tone(520 + pitchOffset * 70, 0.055, "triangle", 0.025, 680 + pitchOffset * 70);
    }, 24);
  }

  function playDegauss() {
    if (isMuted) return;
    tone(110, 0.28, "sawtooth", 0.045, 58);
    tone(220, 0.22, "sine", 0.035, 110);
    noise(0.08, 0.04, 1400);
  }

  function playDoorPullAudio() {
    if (isMuted) return;
    // Heavy metal door latch click
    noise(0.045, 0.11, 2400);
    tone(175, 0.05, "square", 0.055, 85);
    // Low architectural door hinge pull + room air resonance
    setTimeout(() => {
      tone(118, 0.42, "sawtooth", 0.032, 68);
      noise(0.36, 0.045, 520);
    }, 95);
    // Subtle warm CRT room presence arriving
    setTimeout(() => {
      tone(240, 0.26, "sine", 0.028, 180);
    }, 340);
  }

  function playDoorExitAudio() {
    if (isMuted) return;
    tone(145, 0.2, "triangle", 0.045, 62);
    setTimeout(() => {
      noise(0.06, 0.09, 1400);
      tone(95, 0.07, "square", 0.045, 52);
    }, 140);
  }

  function playDialClick() {
    if (isMuted) return;
    noise(0.04, 0.075, 2200);
    tone(150, 0.045, "square", 0.04, 95);
  }

  function playLampSwitch() {
    if (isMuted) return;
    noise(0.035, 0.07, 3600);
    tone(420, 0.03, "square", 0.03, 210);
  }

  function playTapePullClick() {
    if (isMuted) return;
    noise(0.05, 0.065, 2600);
    tone(190, 0.045, "square", 0.035, 115);
  }

  function playChannelSnap() {
    if (isMuted || !loungeOpen || activeCartId) return;
    noise(0.14, 0.038, 2800);
    tone(1320, 0.03, "square", 0.014, 480);
  }

  function playAlarmBeep() {
    if (isMuted) return;
    // Classic 1980s digital desk alarm: BEEP-BEEP-BEEP-BEEP
    [0, 120, 240, 360].forEach((ms) => {
      setTimeout(() => {
        tone(2093, 0.068, "square", 0.045);
      }, ms);
    });
  }

  function playMotif(notes) {
    if (isMuted || !Array.isArray(notes)) return;
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        tone(freq, 0.085, "square", 0.022, freq * 1.015);
        tone(freq * 0.5, 0.1, "triangle", 0.022);
      }, idx * 58);
    });
  }

  function playZzzInsertionAudio() {
    if (isMuted) return;
    noise(0.09, 0.13, 1100);
    tone(105, 0.12, "square", 0.08, 52);

    setTimeout(() => {
      noise(0.055, 0.1, 3000);
      tone(310, 0.055, "triangle", 0.055, 170);
    }, 190);

    setTimeout(() => {
      tone(68, 0.42, "sawtooth", 0.05, 155);
      tone(118, 0.36, "triangle", 0.045, 86);
    }, 360);

    setTimeout(() => {
      tone(130, 0.52, "sawtooth", 0.068, 1280);
      tone(74, 0.48, "sine", 0.085, 36);
      noise(0.32, 0.09, 2600);
    }, 680);

    setTimeout(() => {
      noise(0.68, 0.1, 4400);
      tone(980, 0.06, "square", 0.035, 620);
    }, 1120);

    setTimeout(() => {
      tone(587.33, 0.08, "triangle", 0.06);
      setTimeout(() => tone(880, 0.16, "triangle", 0.07, 1174.66), 90);
    }, 1560);
  }

  function playTapeEjectSequence() {
    if (isMuted) return;
    tone(780, 0.24, "sawtooth", 0.055, 72);
    setTimeout(() => {
      noise(0.1, 0.11, 2000);
      tone(220, 0.08, "square", 0.05, 360);
    }, 130);
  }

  /* ---------------------------------------------------------
     SUBTLE 1980s AFK TV AMBIENT HUM & DUSTY STATIC BED
     --------------------------------------------------------- */
  function startAmbientTvHum() {
    if (isMuted || ambientNodes || !loungeOpen || activeCartId) return;
    const ctx = ensureAudio();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.linearRampToValueAtTime(1.0, now + 0.7);
    masterGain.connect(ctx.destination);

    // 1. Warm 60Hz CRT transformer hum
    const humOsc = ctx.createOscillator();
    const humGain = ctx.createGain();
    humOsc.type = "triangle";
    humOsc.frequency.value = 60;
    humGain.gain.value = 0.011;
    humOsc.connect(humGain);
    humGain.connect(masterGain);
    humOsc.start(now);

    // 2. Very soft dusty vinyl/CRT air static loop (2s buffer)
    const bufLen = ctx.sampleRate * 2;
    const noiseBuf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const out = noiseBuf.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufLen; i++) {
      const white = Math.random() * 2 - 1;
      out[i] = (lastOut + 0.06 * white) / 1.06;
      lastOut = out[i];
    }

    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = noiseBuf;
    noiseSrc.loop = true;

    const bandFilter = ctx.createBiquadFilter();
    bandFilter.type = "bandpass";
    bandFilter.frequency.value = 920;
    bandFilter.Q.value = 0.85;

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.022;

    noiseSrc.connect(bandFilter);
    bandFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noiseSrc.start(now);

    // 3. Faint muffled retro broadcast warble
    const warbleOsc = ctx.createOscillator();
    const lfoOsc = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const warbleFilter = ctx.createBiquadFilter();
    const warbleGain = ctx.createGain();

    warbleOsc.type = "sine";
    warbleOsc.frequency.value = 185;
    lfoOsc.type = "sine";
    lfoOsc.frequency.value = 0.35;
    lfoGain.gain.value = 8;

    warbleFilter.type = "lowpass";
    warbleFilter.frequency.value = 420;
    warbleGain.gain.value = 0.008;

    lfoOsc.connect(lfoGain);
    lfoGain.connect(warbleOsc.frequency);
    warbleOsc.connect(warbleFilter);
    warbleFilter.connect(warbleGain);
    warbleGain.connect(masterGain);

    warbleOsc.start(now);
    lfoOsc.start(now);

    ambientNodes = { masterGain, humOsc, noiseSrc, warbleOsc, lfoOsc };
  }

  function stopAmbientTvHum() {
    if (!ambientNodes) return;
    const nodes = ambientNodes;
    ambientNodes = null;
    try {
      const ctx = audioCtx;
      if (ctx) {
        const now = ctx.currentTime;
        nodes.masterGain.gain.cancelScheduledValues(now);
        nodes.masterGain.gain.setValueAtTime(nodes.masterGain.gain.value, now);
        nodes.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
      }
      setTimeout(() => {
        try {
          nodes.humOsc.stop();
          nodes.noiseSrc.stop();
          nodes.warbleOsc.stop();
          nodes.lfoOsc.stop();
          nodes.masterGain.disconnect();
        } catch (_) {}
      }, 260);
    } catch (_) {}
  }

  /* ---------------------------------------------------------
     LIVE 3-CHANNEL 1980s AFK CRT BROADCAST CANVAS ENGINE
     --------------------------------------------------------- */
  function startBroadcastReel(canvas, statusEl, channelEl) {
    stopBroadcastReel();
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const W = 384;
    const H = 224;
    canvas.width = W;
    canvas.height = H;

    let frame = 0;
    let channelIdx = 0;
    let channelTimer = 0;
    let staticBurstFrames = 14;
    const CHANNEL_DURATION = 540; // ~9 seconds per 1980s broadcast segment

    const CHANNEL_NAMES = ["TV-89 // AD", "TV-89 // SMPTE", "TV-89 // VHS"];

    function drawStaticOverlay(intensity = 0.9) {
      ctx.fillStyle = `rgba(10, 12, 16, ${intensity * 0.45})`;
      ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < 420; i++) {
        const x = (Math.random() * W) | 0;
        const y = (Math.random() * H) | 0;
        const v = (140 + Math.random() * 115) | 0;
        ctx.fillStyle = `rgba(${v},${v},${v},${intensity * 0.65})`;
        ctx.fillRect(x, y, 2 + ((Math.random() * 6) | 0), 2);
      }
      const barY = (frame * 11) % H;
      ctx.fillStyle = `rgba(255,255,255,${intensity * 0.28})`;
      ctx.fillRect(0, barY, W, 8);
    }

    // CHANNEL 0: 1980s Retro Tech/Coffee Commercial ("KAI-VISION / 24H KOPI-TRONIC")
    function drawChannelAd(t) {
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, "#120624");
      sky.addColorStop(0.54, "#3b0a45");
      sky.addColorStop(0.56, "#140826");
      sky.addColorStop(1, "#060814");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // Retro striped 80s sun
      const sunY = 92;
      const sunGrad = ctx.createLinearGradient(0, sunY - 40, 0, sunY + 34);
      sunGrad.addColorStop(0, "#fde047");
      sunGrad.addColorStop(0.6, "#fb923c");
      sunGrad.addColorStop(1, "#e11d48");
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(W * 0.5, sunY, 38, 0, Math.PI * 2);
      ctx.fill();

      // Sun cutout scan bands
      ctx.fillStyle = "#2b0836";
      for (let sy = sunY + 6; sy < sunY + 40; sy += 6) {
        ctx.fillRect(W * 0.5 - 42, sy, 84, 2.5);
      }

      // Scrolling synthwave horizon grid
      ctx.strokeStyle = "rgba(56, 189, 248, 0.55)";
      ctx.lineWidth = 1;
      const horizonY = 124;
      for (let i = -7; i <= 7; i++) {
        ctx.beginPath();
        ctx.moveTo(W * 0.5 + i * 16, horizonY);
        ctx.lineTo(W * 0.5 + i * 64, H);
        ctx.stroke();
      }
      for (let j = 0; j < 8; j++) {
        const p = (j + ((t * 0.04) % 1)) / 8;
        const y = horizonY + p * p * (H - horizonY);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Rotating wireframe diamond badge
      const rx = Math.sin(t * 0.04) * 16;
      ctx.strokeStyle = "#64e3db";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(W * 0.5, 28);
      ctx.lineTo(W * 0.5 + 20 + rx * 0.3, 52);
      ctx.lineTo(W * 0.5, 76);
      ctx.lineTo(W * 0.5 - 20 + rx * 0.3, 52);
      ctx.closePath();
      ctx.stroke();

      // Bold 80s Commercial Slogans
      ctx.textAlign = "center";
      ctx.font = "bold 15px 'Press Start 2P', monospace";
      ctx.fillStyle = "#000000";
      ctx.fillText("KAI-VISION KV-89", W * 0.5 + 2, 114);
      ctx.fillStyle = "#fef08a";
      ctx.fillText("KAI-VISION KV-89", W * 0.5, 112);

      ctx.font = "bold 8px 'Press Start 2P', monospace";
      ctx.fillStyle = "#38bdf8";
      ctx.fillText("24H KOPI-TRONIC • PURWOKERTO", W * 0.5, 138);

      // Scrolling bottom 1980s ad ticker
      ctx.fillStyle = "rgba(8, 10, 18, 0.86)";
      ctx.fillRect(0, H - 28, W, 28);
      ctx.fillStyle = "#f43f5e";
      ctx.fillRect(0, H - 28, W, 2);

      const tickerText = "★ NEW 1989 COLOR PHOSPHOR TUBE ★ CALL 555-04-KAI ★ 4 VHS TAPES ON LEFT SHELF ★ ";
      const offset = -((t * 1.4) % 520);
      ctx.textAlign = "left";
      ctx.font = "bold 8px 'Press Start 2P', monospace";
      ctx.fillStyle = "#f8fafc";
      ctx.fillText(tickerText + tickerText, offset, H - 10);
    }

    // CHANNEL 1: Midnight SMPTE Color Bars & Analog Broadcast Signal
    function drawChannelSmpte(t) {
      const topColors = ["#c0c0c0", "#c0c000", "#00c0c0", "#00c000", "#c000c0", "#c00000", "#0000c0"];
      const bw = W / topColors.length;
      topColors.forEach((col, i) => {
        ctx.fillStyle = col;
        ctx.fillRect(i * bw, 0, bw + 1, H * 0.67);
      });

      const midColors = ["#0000c0", "#131313", "#c000c0", "#131313", "#00c0c0", "#131313", "#c0c0c0"];
      midColors.forEach((col, i) => {
        ctx.fillStyle = col;
        ctx.fillRect(i * bw, H * 0.67, bw + 1, H * 0.11);
      });

      ctx.fillStyle = "#0b1a36";
      ctx.fillRect(0, H * 0.78, W * 0.25, H * 0.22);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(W * 0.25, H * 0.78, W * 0.2, H * 0.22);
      ctx.fillStyle = "#2b0d4c";
      ctx.fillRect(W * 0.45, H * 0.78, W * 0.2, H * 0.22);
      ctx.fillStyle = "#0e0e10";
      ctx.fillRect(W * 0.65, H * 0.78, W * 0.35, H * 0.22);

      // Center analog broadcast slate box
      ctx.fillStyle = "rgba(8, 10, 14, 0.88)";
      ctx.fillRect(46, 56, W - 92, 92);
      ctx.strokeStyle = "#f8fafc";
      ctx.lineWidth = 2;
      ctx.strokeRect(46, 56, W - 92, 92);

      ctx.textAlign = "center";
      ctx.font = "bold 9px 'Press Start 2P', monospace";
      ctx.fillStyle = "#4ade80";
      ctx.fillText("LATE-NIGHT SIGNAL // CH-02", W * 0.5, 82);

      ctx.font = "bold 12px 'Press Start 2P', monospace";
      ctx.fillStyle = "#ffffff";
      const nowWib = getFormattedTime("WIB");
      ctx.fillText(`PWT ${nowWib} WIB`, W * 0.5, 110);

      ctx.font = "7px 'Press Start 2P', monospace";
      ctx.fillStyle = Math.floor(t / 24) % 2 === 0 ? "#fbbf24" : "#94a3b8";
      ctx.fillText("STANDBY — INSERT GAME TAPE", W * 0.5, 134);
    }

    // CHANNEL 2: Video Store Bumper ("RANDOM PLAY // BE KIND, REWIND")
    function drawChannelVhsBumper(t) {
      ctx.fillStyle = "#0b1320";
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = "rgba(250, 204, 21, 0.08)";
      ctx.lineWidth = 8;
      for (let x = -H; x < W + H; x += 28) {
        ctx.beginPath();
        ctx.moveTo(x + ((t * 0.4) % 28), 0);
        ctx.lineTo(x + H + ((t * 0.4) % 28), H);
        ctx.stroke();
      }

      // Animated VHS Cassette Silhouette with Spinning Twin Reels
      const cx = W * 0.5;
      const cy = 96;
      ctx.fillStyle = "#181a20";
      ctx.strokeStyle = "#facc15";
      ctx.lineWidth = 2.5;
      ctx.fillRect(cx - 86, cy - 44, 172, 88);
      ctx.strokeRect(cx - 86, cy - 44, 172, 88);

      [-40, 40].forEach((dx) => {
        const rx = cx + dx;
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(rx, cy + 4, 18, 0, Math.PI * 2);
        ctx.stroke();

        const ang = t * 0.08;
        for (let k = 0; k < 3; k++) {
          const a = ang + (k * Math.PI * 2) / 3;
          ctx.beginPath();
          ctx.moveTo(rx + Math.cos(a) * 5, cy + 4 + Math.sin(a) * 5);
          ctx.lineTo(rx + Math.cos(a) * 15, cy + 4 + Math.sin(a) * 15);
          ctx.stroke();
        }
      });

      ctx.fillStyle = "#334155";
      ctx.fillRect(cx - 22, cy - 4, 44, 16);

      ctx.textAlign = "center";
      ctx.font = "bold 11px 'Press Start 2P', monospace";
      ctx.fillStyle = "#fef08a";
      ctx.fillText("BE KIND, REWIND", cx, 172);

      ctx.font = "7px 'Press Start 2P', monospace";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("RANDOM PLAY • ROOM 04 ARCHIVE", cx, 194);

      ctx.textAlign = "left";
      ctx.font = "bold 8px 'Press Start 2P', monospace";
      ctx.fillStyle = "#4ade80";
      ctx.fillText("PLAY ▶", 18, 24);
      ctx.textAlign = "right";
      ctx.fillStyle = "#cbd5e1";
      ctx.fillText("SP 00:19:89", W - 18, 24);
    }

    function renderLoop() {
      if (!loungeOpen) return;
      broadcastRafId = requestAnimationFrame(renderLoop);
      if (activeCartId) return;

      frame++;
      channelTimer++;

      if (channelTimer >= CHANNEL_DURATION) {
        channelTimer = 0;
        channelIdx = (channelIdx + 1) % 3;
        staticBurstFrames = 22;
        if (isIdleBroadcast) {
          playChannelSnap();
          if (channelEl) channelEl.textContent = `CH-0${channelIdx + 1}`;
          if (statusEl) statusEl.textContent = CHANNEL_NAMES[channelIdx];
        }
      }

      if (channelIdx === 0) drawChannelAd(frame);
      else if (channelIdx === 1) drawChannelSmpte(frame);
      else drawChannelVhsBumper(frame);

      // Subtle continuous 1980s analog VHS tracking line
      const tearY = ((frame * 1.6) % (H + 40)) - 20;
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.fillRect(0, tearY, W, 3);

      // Static burst transition between channels
      if (staticBurstFrames > 0) {
        staticBurstFrames--;
        drawStaticOverlay(staticBurstFrames / 22);
      }
    }

    if (channelEl && isIdleBroadcast) channelEl.textContent = "CH-01";
    if (statusEl && isIdleBroadcast) statusEl.textContent = CHANNEL_NAMES[0];
    renderLoop();
  }

  function stopBroadcastReel() {
    if (broadcastRafId) {
      cancelAnimationFrame(broadcastRafId);
      broadcastRafId = null;
    }
  }

  /* ---------------------------------------------------------
     FLOATING LAMP DUST MOTES CANVAS (FIRST-PERSON ATMOSPHERE)
     --------------------------------------------------------- */
  function startDustParticles(canvas, modalEl) {
    stopDustParticles();
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();

    const motes = Array.from({ length: 42 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 0.9 + Math.random() * 1.9,
      vx: (Math.random() - 0.5) * 0.28,
      vy: -0.12 - Math.random() * 0.25,
      a: 0.14 + Math.random() * 0.34,
      phase: Math.random() * Math.PI * 2
    }));

    function tick() {
      if (!loungeOpen) return;
      dustRafId = requestAnimationFrame(tick);
      if (activeCartId) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isNight = modalEl && modalEl.getAttribute("data-lamp") === "night";

      for (const m of motes) {
        m.phase += 0.015;
        m.x += m.vx + Math.sin(m.phase) * 0.18;
        m.y += m.vy;
        if (m.y < -10) {
          m.y = canvas.height + 10;
          m.x = Math.random() * canvas.width;
        }
        if (m.x < -10) m.x = canvas.width + 10;
        if (m.x > canvas.width + 10) m.x = -10;

        ctx.fillStyle = isNight
          ? `rgba(100, 227, 219, ${m.a * 0.45})`
          : `rgba(254, 240, 180, ${m.a})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    tick();
  }

  function stopDustParticles() {
    if (dustRafId) {
      cancelAnimationFrame(dustRafId);
      dustRafId = null;
    }
  }

  /* ---------------------------------------------------------
     HIDDEN 1980s RED-LED DIGITAL ALARM CLOCK EASTER EGG
     --------------------------------------------------------- */
  let alarmMode = 0; // 0 = WIB (Purwokerto), 1 = Local Time, 2 = Temp Focus
  let liveTempC = "26°C";

  function getFormattedTime(modeKey) {
    const now = new Date();
    const colon = now.getSeconds() % 2 === 0 ? ":" : " ";
    if (modeKey === "WIB") {
      try {
        const parts = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        }).formatToParts(now);
        const hh = parts.find((p) => p.type === "hour")?.value || "00";
        const mm = parts.find((p) => p.type === "minute")?.value || "00";
        return `${hh}${colon}${mm}`;
      } catch (_) {
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const wib = new Date(utc + 7 * 3600000);
        return `${String(wib.getHours()).padStart(2, "0")}${colon}${String(wib.getMinutes()).padStart(2, "0")}`;
      }
    }
    return `${String(now.getHours()).padStart(2, "0")}${colon}${String(now.getMinutes()).padStart(2, "0")}`;
  }

  function initHiddenAlarmClock() {
    const snoozeBtn = document.getElementById("alarmSnoozeBtn");
    const modeEl = document.getElementById("alarmModeLabel");
    const digitsEl = document.getElementById("alarmDigits");
    const tempEl = document.getElementById("alarmTempVal");
    if (!digitsEl) return;

    // Silent background Purwokerto temperature check (clean 26°C fallback if offline)
    fetch("https://api.open-meteo.com/v1/forecast?latitude=-7.4243&longitude=109.2302&current_weather=true")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json && json.current_weather && typeof json.current_weather.temperature === "number") {
          liveTempC = `${Math.round(json.current_weather.temperature)}°C`;
          paintClock();
        }
      })
      .catch(() => {});

    function paintClock() {
      if (alarmMode === 0) {
        if (modeEl) modeEl.textContent = "WIB";
        digitsEl.textContent = getFormattedTime("WIB");
        if (tempEl) tempEl.textContent = liveTempC;
      } else if (alarmMode === 1) {
        if (modeEl) modeEl.textContent = "LOC";
        digitsEl.textContent = getFormattedTime("LOC");
        if (tempEl) tempEl.textContent = liveTempC;
      } else {
        if (modeEl) modeEl.textContent = "PWT";
        digitsEl.textContent = liveTempC;
        if (tempEl) tempEl.textContent = "89FM";
      }
    }

    paintClock();
    if (clockIntervalId) clearInterval(clockIntervalId);
    clockIntervalId = setInterval(paintClock, 1000);

    if (snoozeBtn) {
      snoozeBtn.addEventListener("click", () => {
        alarmMode = (alarmMode + 1) % 3;
        paintClock();
        playKeySwitch(alarmMode);
      });

      snoozeBtn.addEventListener("dblclick", () => {
        playAlarmBeep();
        const prev = digitsEl.textContent;
        digitsEl.textContent = "ALRM!";
        setTimeout(() => {
          digitsEl.textContent = prev;
          paintClock();
        }, 620);
      });
    }
  }

  /* ---------------------------------------------------------
     LIVE 60FPS PROCEDURAL ANALOG TV STATIC SNOW (ZZZ WARP)
     --------------------------------------------------------- */
  function startZzzStatic(canvas) {
    stopZzzStatic();
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const SW = 240;
    const SH = 135;
    canvas.width = SW;
    canvas.height = SH;

    const imgData = ctx.createImageData(SW, SH);
    const buf = imgData.data;
    let frame = 0;

    function renderStatic() {
      frame++;
      for (let i = 0; i < buf.length; i += 4) {
        const v = Math.random() > 0.52 ? 175 + ((Math.random() * 80) | 0) : (Math.random() * 52) | 0;
        buf[i] = v;
        buf[i + 1] = v;
        buf[i + 2] = v;
        buf[i + 3] = 255;
      }
      ctx.putImageData(imgData, 0, 0);

      const barY = (frame * 7) % SH;
      ctx.fillStyle = "rgba(255, 255, 255, 0.32)";
      ctx.fillRect(0, barY, SW, 6);
      ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
      ctx.fillRect(0, (barY + 34) % SH, SW, 11);

      if (frame % 5 === 0) {
        const gy = (Math.random() * SH) | 0;
        ctx.fillStyle = Math.random() > 0.5 ? "rgba(100, 227, 219, 0.35)" : "rgba(239, 68, 68, 0.35)";
        ctx.fillRect(0, gy, SW, 3);
      }

      staticRafId = requestAnimationFrame(renderStatic);
    }

    renderStatic();
  }

  function stopZzzStatic() {
    if (staticRafId) {
      cancelAnimationFrame(staticRafId);
      staticRafId = null;
    }
  }

  const audioApi = { tone, noise };
  let syncMuteUiFn = null;
  let enterLoungeFn = null;
  let exitLoungeFn = null;

  function toggleMute() {
    isMuted = !isMuted;
    if (typeof syncMuteUiFn === "function") syncMuteUiFn();
    if (isMuted) {
      stopAmbientTvHum();
    } else {
      tone(520, 0.08, "triangle", 0.05, 780);
      if (loungeOpen && !activeCartId) startAmbientTvHum();
    }
  }

  function init() {
    const DATA = window.PORTFOLIO_DATA;
    if (!DATA || !DATA.cartridges) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    // Door Portal Elements
    const doorTrigger = document.getElementById("loungeDoorTrigger");
    const enterCta = document.getElementById("enterLoungeCta");
    const doorLeaf = document.getElementById("loungeDoorLeaf");
    const doorSpill = document.getElementById("loungeDoorSpill");

    // Full-Screen POV Room Modal Elements
    const loungeModal = document.getElementById("loungeRoomModal");
    const loungeShell = document.getElementById("loungePovShell");
    const loungeExitBtn = document.getElementById("loungeExitBtn");
    const lampBtn = document.getElementById("loungeLampBtn");
    const dustCanvas = document.getElementById("loungeDustCanvas");
    const broadcastCanvas = document.getElementById("crtBroadcastCanvas");
    const parallaxPlanes = loungeModal ? loungeModal.querySelectorAll(".pov-plane[data-depth]") : [];

    // TV & VCR Elements
    const tvUnit = document.getElementById("crtTvUnit");
    const previewFrame = document.getElementById("crtPreviewFrame");
    const staticNoise = document.getElementById("crtStaticNoise");
    const crtFlash = document.getElementById("crtFlash");
    const crtPowerLed = document.getElementById("crtPowerLed");
    const crtStatusText = document.getElementById("crtStatusText");
    const crtChannelReadout = document.getElementById("crtChannelReadout");
    const tvSliderThumb = document.getElementById("tvSliderThumb");
    const tvDialPrev = document.getElementById("tvDialPrev");
    const tvDialNext = document.getElementById("tvDialNext");

    const attractScreen = document.getElementById("crtAttractScreen");
    const attractSlotTag = document.getElementById("attractSlotTag");
    const attractTitle = document.getElementById("attractTitle");
    const attractDesc = document.getElementById("attractDesc");
    const attractMeta = document.getElementById("attractMeta");

    const vcrSlotBtn = document.getElementById("crtDeckSlot");
    const vcrPlayPrompt = document.getElementById("vcrPlayPrompt");
    const deckInsertedCart = document.getElementById("deckInsertedCart");
    const deckInsertedLabel = document.getElementById("deckInsertedLabel");

    const zzzWarp = document.getElementById("crtZzzWarp");
    const zzzCanvas = document.getElementById("zzzStaticCanvas");
    const zzzStatusText = document.getElementById("zzzStatusText");
    const zzzSubText = document.getElementById("zzzSubText");
    const zzzBarFill = document.getElementById("zzzBarFill");

    const tapeButtons = document.querySelectorAll(".vhs-tape-btn[data-cart]");
    const muteBtn = document.getElementById("crtMuteBtn");
    const navSfxBtn = document.getElementById("navSfxBtn");
    const navSfxLabel = document.getElementById("navSfxLabel");

    const theater = document.getElementById("crtTheater");
    const theaterShell = document.getElementById("crtTheaterShell");
    const theaterCartTag = document.getElementById("theaterCartTag");
    const theaterTitle = document.getElementById("theaterTitle");
    const theaterMuteBtn = document.getElementById("theaterMuteBtn");
    const theaterEjectBtn = document.getElementById("theaterEjectBtn");
    const gameMount = document.getElementById("crtGameMount");

    if (!loungeModal || !previewFrame || !theater || !gameMount) return;

    function syncMuteButtons() {
      const label = isMuted ? "SFX: OFF" : "SFX: ON";
      if (muteBtn) {
        muteBtn.textContent = `♪ ${label}`;
        muteBtn.setAttribute("aria-pressed", String(isMuted));
      }
      if (theaterMuteBtn) {
        theaterMuteBtn.textContent = label;
        theaterMuteBtn.setAttribute("aria-pressed", String(isMuted));
      }
      if (navSfxBtn) {
        navSfxBtn.classList.toggle("is-muted", isMuted);
        navSfxBtn.setAttribute("aria-pressed", String(isMuted));
      }
      if (navSfxLabel) {
        navSfxLabel.textContent = isMuted ? "MUTE" : "SFX";
      }
    }
    syncMuteUiFn = syncMuteButtons;

    if (muteBtn) muteBtn.addEventListener("click", toggleMute);
    if (theaterMuteBtn) theaterMuteBtn.addEventListener("click", toggleMute);
    if (navSfxBtn) navSfxBtn.addEventListener("click", toggleMute);

    /* ---------------------------------------------------------
       3-PLANE FIRST-PERSON POV PARALLAX + BREATHING SWAY
       --------------------------------------------------------- */
    let povTargetX = 0;
    let povTargetY = 0;
    let povCurX = 0;
    let povCurY = 0;
    let breathPhase = 0;

    loungeModal.addEventListener("pointermove", (e) => {
      if (!loungeOpen || isTouchDevice) return;
      povTargetX = e.clientX / window.innerWidth - 0.5;
      povTargetY = e.clientY / window.innerHeight - 0.5;
    });

    function startPovParallax() {
      stopPovParallax();
      if (prefersReducedMotion) return;

      function tick() {
        if (!loungeOpen) return;
        povRafId = requestAnimationFrame(tick);
        if (activeCartId) return;

        breathPhase += 0.016;
        povCurX += (povTargetX - povCurX) * 0.065;
        povCurY += (povTargetY - povCurY) * 0.065;

        const breathY = Math.sin(breathPhase) * 2.2;
        parallaxPlanes.forEach((plane) => {
          const depth = Number(plane.dataset.depth || 16);
          const tx = (-povCurX * depth * 1.45).toFixed(2);
          const ty = (-povCurY * depth * 0.72 + breathY * (depth / 22)).toFixed(2);
          plane.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        });
      }
      tick();
    }

    function stopPovParallax() {
      if (povRafId) {
        cancelAnimationFrame(povRafId);
        povRafId = null;
      }
    }

    /* ---------------------------------------------------------
       ENTER / EXIT ROOM 04 (PULL-DOOR DIMENSION TRANSITION)
       --------------------------------------------------------- */
    function enterIdleBroadcast() {
      isIdleBroadcast = true;
      tapeButtons.forEach((btn) => btn.classList.remove("active-tape"));
      if (attractScreen) attractScreen.classList.add("is-idle-broadcast");
      if (broadcastCanvas) broadcastCanvas.classList.remove("is-dimmed");
      if (crtStatusText) crtStatusText.textContent = "AFK // 1980s TV";
      if (crtChannelReadout) crtChannelReadout.textContent = "TV-89";
      if (vcrPlayPrompt) {
        const cur = DATA.cartridges[selectedCartId];
        vcrPlayPrompt.textContent = cur ? `Press to Play — ${cur.title}` : "Press to Play";
      }
    }

    function scheduleAfkReturn() {
      if (afkReturnTimer) clearTimeout(afkReturnTimer);
      afkReturnTimer = setTimeout(() => {
        if (loungeOpen && !activeCartId && !isTransitioning) {
          playChannelSnap();
          enterIdleBroadcast();
        }
      }, 4800);
    }

    function cancelAfkReturn() {
      if (afkReturnTimer) {
        clearTimeout(afkReturnTimer);
        afkReturnTimer = null;
      }
    }

    function revealLoungeRoom() {
      loungeOpen = true;
      document.body.classList.add("lounge-open");
      loungeModal.classList.add("is-open");
      loungeModal.setAttribute("aria-hidden", "false");

      enterIdleBroadcast();
      startBroadcastReel(broadcastCanvas, crtStatusText, crtChannelReadout);
      startDustParticles(dustCanvas, loungeModal);
      startPovParallax();
      startAmbientTvHum();

      if (window.gsap && !prefersReducedMotion) {
        window.gsap.fromTo(
          loungeModal,
          { opacity: 0 },
          { opacity: 1, duration: 0.42, ease: "power2.out" }
        );
        window.gsap.fromTo(
          loungeShell,
          { scale: 1.14 },
          {
            scale: 1,
            duration: 0.65,
            ease: "power3.out",
            onComplete: () => {
              if (doorLeaf) window.gsap.set(doorLeaf, { clearProps: "transform" });
              if (doorSpill) window.gsap.set(doorSpill, { clearProps: "width,opacity,transform" });
              isTransitioning = false;
            }
          }
        );
      } else {
        isTransitioning = false;
      }
    }

    function enterLounge() {
      if (loungeOpen || isTransitioning) return;
      isTransitioning = true;
      playDoorPullAudio();

      if (window.gsap && doorLeaf && !prefersReducedMotion) {
        const tl = window.gsap.timeline({
          onComplete: revealLoungeRoom
        });

        tl.to(
          doorLeaf,
          {
            rotateY: -108,
            duration: 0.62,
            ease: "power3.inOut"
          },
          0
        );

        if (doorSpill) {
          tl.to(
            doorSpill,
            {
              width: 204,
              opacity: 1,
              duration: 0.55,
              ease: "power2.in"
            },
            0.05
          );
        }

        if (doorTrigger) {
          tl.to(
            doorTrigger,
            {
              scale: 1.32,
              duration: 0.52,
              ease: "expo.in",
              onComplete: () => {
                window.gsap.set(doorTrigger, { clearProps: "transform" });
              }
            },
            0.22
          );
        }
      } else {
        revealLoungeRoom();
      }
    }

    function exitLounge() {
      if (!loungeOpen || isTransitioning) return;
      isTransitioning = true;
      cancelAfkReturn();
      stopAmbientTvHum();
      stopBroadcastReel();
      stopDustParticles();
      stopPovParallax();
      playDoorExitAudio();

      const finishExit = () => {
        loungeOpen = false;
        loungeModal.classList.remove("is-open");
        loungeModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lounge-open");
        if (window.gsap && loungeShell) {
          window.gsap.set(loungeShell, { clearProps: "transform" });
          window.gsap.set(loungeModal, { opacity: 1 });
        }
        isTransitioning = false;
      };

      if (window.gsap && !prefersReducedMotion) {
        window.gsap.to(loungeShell, {
          scale: 0.92,
          duration: 0.3,
          ease: "power2.in"
        });
        window.gsap.to(loungeModal, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: finishExit
        });
      } else {
        finishExit();
      }
    }

    enterLoungeFn = enterLounge;
    exitLoungeFn = exitLounge;

    if (doorTrigger) doorTrigger.addEventListener("click", enterLounge);
    if (enterCta) enterCta.addEventListener("click", enterLounge);
    if (loungeExitBtn) loungeExitBtn.addEventListener("click", exitLounge);

    // Cozy Studio Lamp Toggle (Warm Lamp <-> Late-Night CRT Glow)
    if (lampBtn) {
      lampBtn.addEventListener("click", () => {
        const isWarm = loungeModal.getAttribute("data-lamp") !== "night";
        const next = isWarm ? "night" : "warm";
        loungeModal.setAttribute("data-lamp", next);
        lampBtn.textContent = next === "warm" ? "☀ LAMP: WARM" : "☾ LAMP: NIGHT";
        lampBtn.setAttribute("aria-pressed", String(next === "warm"));
        playLampSwitch();
      });
    }

    /* ---------------------------------------------------------
       VHS TAPE PREVIEW & ZZZ TUBE-PULL GAME LAUNCHER
       --------------------------------------------------------- */
    function selectTapePreview(cartId, withSound = false) {
      const cart = DATA.cartridges[cartId];
      if (!cart) return;

      cancelAfkReturn();
      isIdleBroadcast = false;
      selectedCartId = cartId;

      tapeButtons.forEach((btn) => {
        btn.classList.toggle("active-tape", btn.dataset.cart === cartId);
      });

      if (attractScreen) attractScreen.classList.remove("is-idle-broadcast");
      if (broadcastCanvas) broadcastCanvas.classList.add("is-dimmed");

      previewFrame.style.background = cart.bgGradient;
      attractSlotTag.textContent = `${cart.slot} // ${cart.genre}`;
      attractSlotTag.style.color = cart.accent;
      attractSlotTag.style.borderColor = cart.accent;
      attractTitle.textContent = cart.title;
      attractDesc.textContent = cart.desc;
      crtChannelReadout.textContent = cart.channel;
      if (crtStatusText) crtStatusText.textContent = `READY • ${cart.slot}`;
      if (vcrPlayPrompt) vcrPlayPrompt.textContent = `Press to Play — ${cart.title}`;
      attractMeta.innerHTML = cart.tags.map((t) => `<span>${t}</span>`).join("");

      const idx = Math.max(0, CART_ORDER.indexOf(cartId));
      if (tvSliderThumb) {
        tvSliderThumb.style.top = `${14 + idx * 21}%`;
      }

      if (withSound) {
        playTapePullClick();
        playMotif(cart.motif);
      }
    }

    function openTheaterAndMount(cart, engine) {
      theaterCartTag.textContent = cart.slot;
      theaterCartTag.style.color = cart.accent;
      theaterCartTag.style.borderColor = cart.accent;
      theaterTitle.textContent = cart.title;

      document.body.classList.add("theater-open");
      theater.classList.add("is-open");
      theater.setAttribute("aria-hidden", "false");

      if (window.gsap) {
        if (tvUnit) window.gsap.set(tvUnit, { clearProps: "transform" });
        if (staticNoise) window.gsap.set(staticNoise, { opacity: 0 });
        if (crtFlash) window.gsap.set(crtFlash, { opacity: 0 });
        if (deckInsertedCart) window.gsap.set(deckInsertedCart, { y: 52, opacity: 0, scale: 1 });
        if (vcrPlayPrompt) vcrPlayPrompt.style.opacity = "1";

        window.gsap.set(theater, { opacity: 1 });
        window.gsap.fromTo(
          theaterShell,
          { scale: 1.08, opacity: 0.2 },
          { scale: 1, opacity: 1, duration: 0.34, ease: "power3.out" }
        );

        if (zzzWarp && zzzWarp.classList.contains("is-active")) {
          window.gsap.to(zzzWarp, {
            opacity: 0,
            duration: 0.28,
            ease: "power2.out",
            onComplete: () => {
              stopZzzStatic();
              zzzWarp.classList.remove("is-active");
              zzzWarp.setAttribute("aria-hidden", "true");
              window.gsap.set(zzzWarp, { opacity: 1 });
              isTransitioning = false;
            }
          });
        } else {
          stopZzzStatic();
          isTransitioning = false;
        }
      } else {
        stopZzzStatic();
        if (zzzWarp) {
          zzzWarp.classList.remove("is-active");
          zzzWarp.setAttribute("aria-hidden", "true");
        }
        isTransitioning = false;
      }

      gameMount.innerHTML = "";
      requestAnimationFrame(() => {
        activeGame = engine.mount(gameMount, audioApi);
      });
    }

    function launchCartridge(cartId) {
      if (isTransitioning) return;
      const cart = DATA.cartridges[cartId];
      const engine = window.CRT_GAMES && window.CRT_GAMES[cartId];
      if (!cart || !engine) return;

      if (activeGame && typeof activeGame.destroy === "function") {
        activeGame.destroy();
        activeGame = null;
      }

      cancelAfkReturn();
      stopAmbientTvHum();
      isTransitioning = true;
      activeCartId = cartId;
      selectTapePreview(cartId, false);
      playZzzInsertionAudio();

      if (crtPowerLed) crtPowerLed.classList.add("crt-led--active");
      if (crtStatusText) crtStatusText.textContent = `INSERTING ${cart.slot}...`;
      if (deckInsertedLabel) deckInsertedLabel.textContent = `${cart.slot} // ${cart.title}`;
      if (deckInsertedCart) deckInsertedCart.style.borderColor = cart.accent;
      if (vcrPlayPrompt) vcrPlayPrompt.style.opacity = "0";

      if (!window.gsap || prefersReducedMotion) {
        openTheaterAndMount(cart, engine);
        return;
      }

      const tl = window.gsap.timeline({
        onComplete: () => openTheaterAndMount(cart, engine)
      });

      if (deckInsertedCart) {
        tl.fromTo(
          deckInsertedCart,
          { y: 52, opacity: 0, scale: 1 },
          { y: 0, opacity: 1, duration: 0.28, ease: "power3.out" },
          0
        )
          .to(deckInsertedCart, { scale: 0.94, duration: 0.12, ease: "power2.inOut" }, 0.3)
          .to(deckInsertedCart, { y: -36, opacity: 0.15, duration: 0.22, ease: "power2.in" }, 0.42);
      }

      if (staticNoise) {
        tl.to(staticNoise, { opacity: 0.72, duration: 0.22, ease: "steps(4)" }, 0.48)
          .to(staticNoise, { opacity: 0.25, duration: 0.1, ease: "none" }, 0.7)
          .to(staticNoise, { opacity: 0.95, duration: 0.2, ease: "steps(4)" }, 0.8);
      }

      if (crtFlash) {
        tl.to(crtFlash, { opacity: 0.65, duration: 0.12, ease: "power2.out" }, 0.56)
          .to(crtFlash, { opacity: 0.12, duration: 0.12, ease: "power2.in" }, 0.68)
          .to(crtFlash, { opacity: 0.96, duration: 0.26, ease: "power3.in" }, 0.84);
      }

      if (tvUnit) {
        tl.to(
          tvUnit,
          {
            scale: 1.36,
            y: -22,
            duration: 0.54,
            ease: "expo.in",
            onStart: () => {
              if (crtStatusText) crtStatusText.textContent = `PULLING INTO ${cart.channel}...`;
            }
          },
          0.6
        );
      }

      if (zzzWarp) {
        tl.call(
          () => {
            if (zzzStatusText) {
              zzzStatusText.textContent = `SIGNAL LOCKED // ${cart.channel}`;
              zzzStatusText.style.color = cart.accent;
            }
            if (zzzSubText) zzzSubText.textContent = `SYNCING ${cart.slot}...`;
            if (zzzBarFill) {
              zzzBarFill.style.width = "0%";
              zzzBarFill.style.background = cart.accent;
            }
            zzzWarp.classList.add("is-active");
            zzzWarp.setAttribute("aria-hidden", "false");
            startZzzStatic(zzzCanvas);
          },
          null,
          1.08
        );

        tl.fromTo(zzzWarp, { opacity: 0 }, { opacity: 1, duration: 0.14, ease: "power2.out" }, 1.08);

        if (zzzBarFill) {
          tl.to(zzzBarFill, { width: "62%", duration: 0.34, ease: "power2.out" }, 1.18)
            .call(
              () => {
                if (zzzSubText) zzzSubText.textContent = `NOW LOADING // ${cart.title}`;
              },
              null,
              1.52
            )
            .to(zzzBarFill, { width: "100%", duration: 0.34, ease: "expo.inOut" }, 1.54);
        }
      }
    }

    function ejectCartridge() {
      if (!theater.classList.contains("is-open") || isTransitioning) return;
      isTransitioning = true;
      playTapeEjectSequence();

      if (activeGame && typeof activeGame.destroy === "function") {
        activeGame.destroy();
        activeGame = null;
      }
      activeCartId = null;

      const finishClose = () => {
        gameMount.innerHTML = "";
        theater.classList.remove("is-open");
        theater.setAttribute("aria-hidden", "true");
        document.body.classList.remove("theater-open");
        if (crtPowerLed) crtPowerLed.classList.remove("crt-led--active");
        isTransitioning = false;
        if (loungeOpen) {
          enterIdleBroadcast();
          startAmbientTvHum();
        }
      };

      if (window.gsap && theaterShell && !prefersReducedMotion) {
        window.gsap.to(theaterShell, {
          scale: 0.82,
          opacity: 0,
          duration: 0.24,
          ease: "power2.in"
        });
        window.gsap.to(theater, {
          opacity: 0,
          duration: 0.24,
          ease: "power2.in",
          onComplete: finishClose
        });
      } else {
        finishClose();
      }
    }

    // VHS Shelf Hover & Click Listeners
    let lastHoverTime = 0;
    tapeButtons.forEach((btn) => {
      const cartId = btn.dataset.cart;
      if (!DATA.cartridges[cartId]) return;

      const onHover = () => {
        if (isTransitioning || !loungeOpen) return;
        const now = performance.now();
        const shouldPlay = now - lastHoverTime > 170;
        if (shouldPlay) lastHoverTime = now;
        selectTapePreview(cartId, shouldPlay);
      };

      btn.addEventListener("mouseenter", onHover);
      btn.addEventListener("focus", onHover);
      btn.addEventListener("click", () => launchCartridge(cartId));
    });

    const bay = document.getElementById("cartridgeBay");
    if (bay) {
      bay.addEventListener("mouseleave", scheduleAfkReturn);
    }
    if (vcrSlotBtn) {
      vcrSlotBtn.addEventListener("mouseenter", cancelAfkReturn);
      vcrSlotBtn.addEventListener("mouseleave", scheduleAfkReturn);
      vcrSlotBtn.addEventListener("click", () => launchCartridge(selectedCartId));
    }

    // Rotary Channel Dials on the CRT Sidepanel
    function cycleChannel(step) {
      if (isTransitioning || !loungeOpen) return;
      const idx = Math.max(0, CART_ORDER.indexOf(selectedCartId));
      const nextId = CART_ORDER[(idx + step + CART_ORDER.length) % CART_ORDER.length];
      playDialClick();
      selectTapePreview(nextId, false);
      scheduleAfkReturn();
    }

    if (tvDialPrev) tvDialPrev.addEventListener("click", () => cycleChannel(-1));
    if (tvDialNext) tvDialNext.addEventListener("click", () => cycleChannel(1));

    if (theaterEjectBtn) {
      theaterEjectBtn.addEventListener("click", ejectCartridge);
    }

    theater.addEventListener("click", (e) => {
      if (e.target === theater) ejectCartridge();
    });

    window.addEventListener("keydown", (e) => {
      if (theater.classList.contains("is-open")) {
        if (e.code === "Escape" && (e.shiftKey || activeCartId !== "monolith")) {
          ejectCartridge();
        }
        return;
      }

      if (loungeOpen && e.code === "Escape") {
        exitLounge();
        return;
      }

      if (
        !document.body.classList.contains("modal-open") &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName) &&
        e.code === "KeyM"
      ) {
        toggleMute();
      }
    });

    initHiddenAlarmClock();
    syncMuteButtons();
  }

  return {
    init,
    tone,
    noise,
    toggleMute,
    playKeySwitch,
    playDegauss,
    enterLounge: () => typeof enterLoungeFn === "function" && enterLoungeFn(),
    exitLounge: () => typeof exitLoungeFn === "function" && exitLoungeFn(),
    isLoungeOpen: () => loungeOpen
  };
})();