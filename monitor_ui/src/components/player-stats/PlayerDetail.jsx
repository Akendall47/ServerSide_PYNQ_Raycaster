import React from 'react';
import {
  formatDuration,
  formatTimestamp,
  gameModeLabel,
  roleLabel,
} from './utils.js';

export default function PlayerDetail({ matches, loading, error }) {
  const recent = matches.slice(0, 10);
  const recentForm = matches.slice(0, 5);
  const roleBreakdown = matches.reduce((acc, match) => {
    const bucket = match.role === 'tagger' ? 'tagger' : 'runner';
    acc[bucket].matches += 1;
    acc[bucket].wins += match.won ? 1 : 0;
    acc[bucket].tags += match.tag_count;
    acc[bucket].bits += match.bits_collected;
    return acc;
  }, {
    runner: { matches: 0, wins: 0, tags: 0, bits: 0 },
    tagger: { matches: 0, wins: 0, tags: 0, bits: 0 },
  });

  return (
    <div className="player-detail-panel">
      <div className="player-detail-head">
        <div>
          <div className="panel-head-note">expanded match tape</div>
          <h3>Recent Match History</h3>
        </div>
        <div className="player-form-strip">
          {recentForm.length ? recentForm.map((match) => (
            <span
              key={`${match.match_id}:${match.timestamp}`}
              className={`player-form-chip ${match.won ? 'win' : 'loss'}`}
              title={`${roleLabel(match.role)} · ${match.map_name || 'unknown map'}`}
            >
              {match.won ? 'W' : 'L'}
            </span>
          )) : <span className="metric-note">no completed matches yet</span>}
        </div>
      </div>

      <div className="player-role-breakdown">
        <div className="panel-inset">
          <span className="player-breakdown-label">Runner career</span>
          <span>{roleBreakdown.runner.wins}/{roleBreakdown.runner.matches} wins</span>
          <span>{roleBreakdown.runner.tags} times tagged</span>
        </div>
        <div className="panel-inset">
          <span className="player-breakdown-label">Tagger career</span>
          <span>{roleBreakdown.tagger.wins}/{roleBreakdown.tagger.matches} wins</span>
          <span>{roleBreakdown.tagger.tags} tags landed</span>
        </div>
      </div>

      {loading ? (
        <div className="player-detail-status">
          <span className="player-spinner" />
          <span>LOADING MATCH TAPE...</span>
        </div>
      ) : null}
      {!loading && error ? <div className="player-detail-status error">{error}</div> : null}
      {!loading && !error && !recent.length ? <div className="player-detail-status">NO MATCH HISTORY FOR THIS PLAYER YET.</div> : null}

      {!loading && !error && recent.length ? (
        <div className="player-history-table-wrap">
          <table className="player-history-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Role</th>
                <th>Result</th>
                <th>Map</th>
                <th>Mode</th>
                <th>Duration</th>
                <th>Tags</th>
                <th>Bits</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((match) => (
                <tr key={`${match.match_id}:${match.timestamp}`}>
                  <td>{formatTimestamp(match.timestamp)}</td>
                  <td>{roleLabel(match.role)}</td>
                  <td className={match.won ? 'result-win' : 'result-loss'}>{match.won ? 'Won' : 'Lost'}</td>
                  <td>{match.map_name || '—'}</td>
                  <td>{gameModeLabel(match.game_mode)}</td>
                  <td>{formatDuration(match.duration_ms)}</td>
                  <td>{match.tag_count}</td>
                  <td>{match.bits_collected}/{match.bits_total || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
