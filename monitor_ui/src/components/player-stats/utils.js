export const FLAG_GHOST = 0x08;

export const PLAYER_PALETTE = [
  '#00ff88',
  '#00d4ff',
  '#ffaa00',
  '#ff6688',
  '#a855f7',
  '#7cfffa',
  '#ffd700',
  '#f05252',
];

export function asNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function normaliseProfile(profile = {}) {
  return {
    player_key: String(profile.player_key || ''),
    display_name: String(profile.display_name || profile.username || profile.player_key || 'unknown player'),
    username: String(profile.username || ''),
    controller_key: String(profile.controller_key || ''),
    identity_source: String(profile.identity_source || ''),
    first_seen_at: String(profile.first_seen_at || ''),
    last_seen_at: String(profile.last_seen_at || ''),
    last_match_id: String(profile.last_match_id || ''),
    match_count: asNumber(profile.match_count),
    matches_as_runner: asNumber(profile.matches_as_runner),
    matches_as_tagger: asNumber(profile.matches_as_tagger),
    wins_as_runner: asNumber(profile.wins_as_runner),
    wins_as_tagger: asNumber(profile.wins_as_tagger),
    total_wins: asNumber(profile.total_wins),
    total_tags_landed: asNumber(profile.total_tags_landed),
    times_tagged: asNumber(profile.times_tagged),
    total_bits_collected: asNumber(profile.total_bits_collected),
  };
}

export function normaliseMatch(match = {}) {
  return {
    timestamp: String(match.timestamp || ''),
    match_id: String(match.match_id || ''),
    status: String(match.status || ''),
    role: String(match.role || ''),
    won: asNumber(match.won),
    map_name: String(match.map_name || ''),
    game_mode: asNumber(match.game_mode),
    duration_ms: asNumber(match.duration_ms),
    tag_count: asNumber(match.tag_count),
    bits_collected: asNumber(match.bits_collected),
    bits_total: asNumber(match.bits_total),
    winner: String(match.winner || ''),
  };
}

export function roleLabel(role) {
  if (role === 'runner') return 'Runner';
  if (role === 'tagger') return 'Tagger';
  if (role === 'ghost') return 'Ghost';
  return 'Offline';
}

export function gameModeLabel(mode) {
  return asNumber(mode) === 1 ? 'Chase Bits' : 'Chase';
}

export function formatPercent(numerator, denominator) {
  if (!denominator) return '0%';
  return `${Math.round((numerator / denominator) * 100)}%`;
}

export function formatTimestamp(value) {
  return value ? value.replace('T', ' ') : '—';
}

export function formatDuration(durationMs) {
  if (!durationMs) return '—';
  if (durationMs >= 60000) return `${(durationMs / 60000).toFixed(1)} min`;
  return `${(durationMs / 1000).toFixed(1)} s`;
}

export function formatCoordinate(value) {
  return Number.isFinite(value) ? value.toFixed(1) : '—';
}

export function formatAngle(value) {
  return Number.isFinite(value) ? `${Math.round(value)}°` : '—';
}

export function formatFlags(value) {
  if (!Number.isFinite(value)) return '—';
  return `0x${Math.max(0, Math.trunc(value)).toString(16).padStart(2, '0')}`;
}

export function isGhostPlayer(player) {
  return Boolean(asNumber(player?.flags) & FLAG_GHOST) || Boolean(player?.is_ghost);
}

export function currentRoleForPlayer(player) {
  if (!player) return null;
  if (isGhostPlayer(player)) return 'ghost';
  if (asNumber(player.id) === 1) return 'runner';
  if (asNumber(player.id) === 2) return 'tagger';
  return null;
}

export function stableColourForKey(key) {
  const text = String(key || 'player');
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash << 5) - hash) + text.charCodeAt(index);
    hash |= 0;
  }
  return PLAYER_PALETTE[Math.abs(hash) % PLAYER_PALETTE.length];
}
