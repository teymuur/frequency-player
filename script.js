const synth = new Tone.Synth().toDestination();

let currentFrequency = 0;

const slider = document.getElementById('frequencySlider');
const frequencyInput = document.getElementById('frequencyInput');

slider.oninput = function() {
    frequencyInput.value = parseFloat(this.value).toFixed(2);
    updateFrequencyInfo(this.value);

    playCustomFrequency(this.value);
    
}

frequencyInput.oninput = function() {
    slider.value = this.value;
    updateFrequencyInfo(this.value);
    playCustomFrequency(this.value);
   
}

function playFrequency(freq) {
    
    synth.triggerAttack(freq);
    isPlaying = true;
    currentFrequency = freq;
    
    slider.value = freq;
    frequencyInput.value = parseFloat(freq).toFixed(2);
    
    updateFrequencyInfo(freq);
}

function playCustomFrequency() {
    const freq = parseFloat(frequencyInput.value);
    if (freq >= 20 && freq <= 20000) {
        playFrequency(freq);
    } else {
        alert("Please enter a frequency between 20 Hz and 20,000 Hz.");
    }
}

function updateFrequencyInfo(freq) {
    const info = getFrequencyInfo(freq);
    document.getElementById('frequencyInfo').innerHTML = info;
}

function getFrequencyInfo(freq) {
    freq = parseFloat(freq);
    let info = `<h2>Current Frequency: ${freq.toFixed(2)} Hz</h2>`;
    
    const pianoNote = getPianoNote(freq);
    if (pianoNote) {
        info += `<p>Nearest piano key: ${pianoNote}</p>`;
    }

    if (freq < 20) {
        info += "<p>This frequency is below the typical range of human hearing (20 Hz - 20 kHz).</p>";
    } else if (freq >= 20 && freq < 100) {
        info += getBrainwaveInfo(freq);
    } else {
        info += getHigherFrequencyInfo(freq);
    }
    
    return info;
}

function getBrainwaveInfo(freq) {
    if (freq < 4) {
        return "<p>This frequency is in the Delta wave range (0.5-4 Hz). Delta waves are associated with deep sleep and regeneration.</p>";
    } else if (freq < 8) {
        return "<p>This frequency is in the Theta wave range (4-8 Hz). Theta waves are associated with deep relaxation, meditation, and creative states.</p>";
    } else if (freq < 12) {
        return "<p>This frequency is in the Alpha wave range (8-12 Hz). Alpha waves are associated with relaxed alertness, calmness, and positive thinking.</p>";
    } else if (freq < 30) {
        return "<p>This frequency is in the Beta wave range (12-30 Hz). Beta waves are associated with normal waking consciousness, active thinking, and problem-solving.</p>";
    } else if (freq < 100) {
        return "<p>This frequency is in the Gamma wave range (30-100 Hz). Gamma waves are associated with higher cognitive functions, learning, and information processing.</p>";
    }
}
function getHigherFrequencyInfo(freq) {
    if (freq >= 174 && freq < 285) {
        return "<p>174 Hz: This frequency is associated with pain relief and relaxation, helping to reduce stress and promote healing.</p>";
    } else if (freq >= 285 && freq < 396) {
        return "<p>285 Hz: Known for its ability to accelerate tissue healing and boost overall energy, this frequency is linked with regeneration.</p>";
    } else if (freq >= 396 && freq < 417) {
        return "<p>396 Hz: This frequency helps release guilt and fear, creating a sense of liberation and grounding.</p>";
    } else if (freq >= 417 && freq < 528) {
        return "<p>417 Hz: Known for undoing negative situations and facilitating change, it helps bring about transformation and healing.</p>";
    } else if (freq >= 528 && freq < 639) {
        return "<p>528 Hz: Often called the ‘miracle’ frequency, it promotes love and DNA repair, and is deeply connected to transformation and harmony.</p>";
    } else if (freq >= 639 && freq < 741) {
        return "<p>639 Hz: This frequency fosters communication, connection, and understanding in relationships.</p>";
    } else if (freq >= 741 && freq < 852) {
        return "<p>741 Hz: It aids in problem-solving, cleansing the body of toxins, and awakening intuition.</p>";
    } else if (freq >= 852 && freq < 963) {
        return "<p>852 Hz: This frequency helps reconnect with spiritual order and raise awareness.</p>";
    } else if (freq >= 963 && freq <= 1000) {
        return "<p>963 Hz: Known as the frequency of divine connection, it promotes awakening and connection to higher energies.</p>";
    } else if (freq >= 1000 && freq < 2000) {
        return "<p>This frequency is in the midrange, contributing to clarity in sound and speech.</p>";
    } else if (freq >= 2000 && freq < 4000) {
        return "<p>This frequency improves presence and intelligibility in audio.</p>";
    } else if (freq >= 4000 && freq < 6000) {
        return "<p>This frequency enhances clarity and brightness in music or voice.</p>";
    } else if (freq >= 6000 && freq < 10000) {
        return "<p>This range adds brilliance and sparkle to sound.</p>";
    } else if (freq >= 10000 && freq <= 20000) {
        return "<p>These high frequencies create a sense of air and spaciousness in sound, but are often at the upper limit of human hearing.</p>";
    } else {
        return "<p>This frequency is above the typical range of human hearing (20 Hz - 20 kHz).</p>";
    }
}


function getPianoNote(freq) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const a4 = 440;
    const c0 = a4 * Math.pow(2, -4.75);
    
    if (freq < c0 || freq > c0 * Math.pow(2, 8)) {
        return null;
    }
    
    const halfSteps = Math.round(12 * Math.log2(freq / c0));
    const octave = Math.floor(halfSteps / 12);
    const noteIndex = halfSteps % 12;
    
    return `${notes[noteIndex]}${octave} (${freq.toFixed(2)} Hz)`;
}

// Initialize frequency info on page load
updateFrequencyInfo(440);