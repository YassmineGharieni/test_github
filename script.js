const state = {
  tracks: [],
  currentIndex: 0,
  audio: new Audio(),
  isPlaying: false,
  userVolume: 0.8
};

const el = {
  title: document.getElementById('title'),
  artist: document.getElementById('artist'),
  coverImg: document.getElementById('coverImg'),
  playBtn: document.getElementById('playBtn'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  muteBtn: document.getElementById('muteBtn'),
  volume: document.getElementById('volume'),
  progress: document.getElementById('progress'),
  progressBar: document.getElementById('progressBar'),
  time: document.getElementById('time'),
  playlistInner: document.getElementById('playlistInner'),
  eq: document.getElementById('eq'),
  playerCard: document.getElementById('playerCard')
};

function fmtTime(s) {
  if (!isFinite(s)) return "00:00";
  const mm = Math.floor(s / 60).toString().padStart(2, '0');
  const ss = Math.floor(s % 60).toString().padStart(2, '0');
  return mm + ':' + ss;
}


async function loadPlaylist() {
  try {
    const res = await fetch('tracks.json');
    const data = await res.json();
    state.tracks = data;
    renderPlaylist();
    loadTrack(0);
  } catch (err) {
    console.error(err);
    el.title.textContent = 'Erreur de chargement';
  }
}

function renderPlaylist() {
  el.playlistInner.innerHTML = '';
  state.tracks.forEach((t, i) => {
    const div = document.createElement('div');
    div.className = 'track-item';
    div.innerHTML = `<span>${t.title}</span><small>${t.artist}</small>`;
    div.addEventListener('click', () => playIndex(i));
    el.playlistInner.appendChild(div);
  });
  highlightActive();
}

function highlightActive() {
  document.querySelectorAll('.track-item').forEach((el, idx) => {
    el.classList.toggle('active', idx === state.currentIndex);
  });
}


function loadTrack(i) {
  const track = state.tracks[i];
  if (!track) return;
  state.currentIndex = i;
  state.audio.src = track.src;
  el.title.textContent = track.title;
  el.artist.textContent = track.artist;
  el.coverImg.src = track.cover;
  highlightActive();
}


function play() {
  state.audio.volume = state.userVolume;
  state.audio.play();
  state.isPlaying = true;
  el.playBtn.textContent = '⏸';
  el.eq.classList.add('playing');
}

function pause() {
  state.audio.pause();
  state.isPlaying = false;
  el.playBtn.textContent = '▶️';
  el.eq.classList.remove('playing');
}

function togglePlay() {
  state.isPlaying ? pause() : play();
}

function next() {
  state.currentIndex = (state.currentIndex + 1) % state.tracks.length;
  loadTrack(state.currentIndex);
  play();
}

function prev() {
  state.currentIndex = (state.currentIndex - 1 + state.tracks.length) % state.tracks.length;
  loadTrack(state.currentIndex);
  play();
}

el.volume.addEventListener('input', e => {
  const v = parseFloat(e.target.value);
  state.userVolume = v;
  state.audio.volume = v;
  el.muteBtn.textContent = v === 0 ? '🔈' : '🔊';
});

el.muteBtn.addEventListener('click', () => {
  state.audio.muted = !state.audio.muted;
  el.muteBtn.textContent = state.audio.muted ? '🔇' : '🔊';
});

state.audio.addEventListener('timeupdate', () => {
  const pct = (state.audio.currentTime / state.audio.duration) * 100;
  el.progressBar.style.width = `${pct}%`;
  el.time.textContent = `${fmtTime(state.audio.currentTime)} / ${fmtTime(state.audio.duration)}`;
});

el.progress.addEventListener('click', e => {
  const rect = el.progress.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  state.audio.currentTime = pct * state.audio.duration;
});


el.playBtn.addEventListener('click', togglePlay);
el.nextBtn.addEventListener('click', next);
el.prevBtn.addEventListener('click', prev);


state.audio.addEventListener('ended', next);

loadPlaylist();
