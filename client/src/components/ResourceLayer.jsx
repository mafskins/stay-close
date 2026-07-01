import { useState } from 'react'
import { NATIONAL, REGIONS, TYPE_LABELS } from '../data/resources'

const PINS = [
  { id: 'auckland',     x: 118, y: 88,  label: 'Auckland' },
  { id: 'hamilton',     x: 112, y: 112, label: 'Hamilton' },
  { id: 'wellington',   x: 130, y: 252, label: 'Wellington' },
  { id: 'christchurch', x: 100, y: 340, label: 'Christchurch' },
  { id: 'dunedin',      x: 78,  y: 415, label: 'Dunedin' },
]

function NZMap({ region, onSelect, t }) {
  const [hoveredPin, setHoveredPin] = useState(null)
  return (
    <div style={{ flexShrink: 0, width: 150 }}>
      <svg viewBox="0 0 200 500" width="150" style={{ overflow: 'visible' }}>
        <path
          d={
            'M 118,20 ' +
            'C 124,28 130,36 134,44 ' +
            'C 140,54 148,62 158,70 ' +
            'C 166,76 174,80 180,88 ' +
            'C 188,96 192,108 190,120 ' +
            'C 188,132 182,140 174,146 ' +
            'C 164,152 152,154 144,158 ' +
            'C 136,162 130,168 128,176 ' +
            'C 126,184 128,194 130,202 ' +
            'C 132,210 136,218 136,226 ' +
            'C 136,236 132,246 128,254 ' +
            'C 124,260 120,264 116,264 ' +
            'C 110,264 106,258 104,250 ' +
            'C 102,240 104,228 108,218 ' +
            'C 112,206 116,196 116,184 ' +
            'C 116,170 110,158 106,146 ' +
            'C 100,132 96,118 92,104 ' +
            'C 88,92 86,80 88,68 ' +
            'C 90,56 96,46 104,38 ' +
            'C 110,30 114,24 118,20 Z'
          }
          fill="rgba(66,184,131,0.15)" stroke="#42b883" strokeWidth="1.2"
        />
        <path
          d={
            'M 92,148 C 86,150 80,154 76,160 ' +
            'C 72,166 72,174 76,178 ' +
            'C 80,182 86,180 92,176 ' +
            'C 96,172 98,166 96,160 ' +
            'C 94,154 92,148 92,148 Z'
          }
          fill="rgba(66,184,131,0.15)" stroke="#42b883" strokeWidth="1.2"
        />
        <path
          d={
            'M 114,280 ' +
            'C 120,288 126,298 130,308 ' +
            'C 134,318 136,330 136,342 ' +
            'C 136,354 132,366 128,377 ' +
            'C 124,388 118,397 112,406 ' +
            'C 106,415 98,422 90,428 ' +
            'C 80,434 70,438 60,438 ' +
            'C 50,438 40,434 32,426 ' +
            'C 24,418 20,406 20,394 ' +
            'C 20,382 24,370 30,360 ' +
            'C 36,350 44,342 52,336 ' +
            'C 60,330 68,326 74,320 ' +
            'C 82,312 88,302 92,292 ' +
            'C 98,280 104,270 114,280 Z'
          }
          fill="rgba(66,184,131,0.15)" stroke="#42b883" strokeWidth="1.2"
        />
        <ellipse cx="46" cy="460" rx="12" ry="8" fill="rgba(66,184,131,0.12)" stroke="#42b883" strokeWidth="1" />
        <g transform="translate(22, 486)" opacity="0.4">
          <path d="M 0,0 C 0,-6 6,-10 12,-10 C 20,-10 24,-4 22,2 C 20,8 14,10 8,8 C 2,6 -2,0 0,0" fill="none" stroke="#42b883" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 0,0 L 0,-18" fill="none" stroke="#42b883" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        {PINS.map(function(pin) {
          var active = region === pin.id
          var hovered = hoveredPin === pin.id
          var highlight = active || hovered
          return (
            <g key={pin.id} style={{ cursor: 'pointer' }}
              onClick={function() { onSelect(pin.id) }}
              onMouseEnter={function() { setHoveredPin(pin.id) }}
              onMouseLeave={function() { setHoveredPin(null) }}
            >
              {active && <circle cx={pin.x} cy={pin.y} r={13} fill="rgba(66,184,131,0.12)" />}
              <circle cx={pin.x} cy={pin.y} r={highlight ? 6 : 4}
                fill={highlight ? '#42b883' : t.card}
                stroke={highlight ? '#42b883' : t.muted}
                strokeWidth="1.5" style={{ transition: 'all 150ms ease' }}
              />
              <text x={pin.x + 9} y={pin.y + 4} fontSize="8.5"
                fill={highlight ? '#42b883' : t.muted}
                fontFamily="inherit" fontWeight={highlight ? '700' : '400'}
                style={{ transition: 'fill 150ms ease' }}
              >{pin.label}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function ResourceCard({ r, t }) {
  var tag = TYPE_LABELS[r.type] || { label: r.type, color: t.muted }
  return (
    <div style={{ padding: '12px 14px', borderRadius: 10, background: t.card, border: '1px solid ' + t.border, marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{r.name}</span>
        <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 20, background: tag.color + '22', color: tag.color, whiteSpace: 'nowrap', flexShrink: 0 }}>{tag.label}</span>
      </div>
      {r.desc && <p style={{ margin: '4px 0 8px', fontSize: 12, color: t.muted, lineHeight: 1.5 }}>{r.desc}</p>}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        {r.phone && <a href={'tel:' + r.phone.replace(/\s/g, '')} style={{ fontSize: 13, color: '#42b883', textDecoration: 'none', fontWeight: 600 }}>{r.phone}</a>}
        {r.url && <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: t.muted, textDecoration: 'none' }}>Website</a>}
      </div>
    </div>
  )
}

export default function ResourceLayer({ t }) {
  var [tab, setTab] = useState('local')
  var [region, setRegion] = useState('wellington')
  var local = REGIONS[region]
  function tabStyle(active) {
    return { padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', fontFamily: 'inherit', transition: 'all 150ms ease', background: active ? t.accent : 'transparent', color: active ? '#000' : t.muted }
  }
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: t.card, borderRadius: 10, padding: 4, border: '1px solid ' + t.border, width: 'fit-content' }}>
        <button onClick={function() { setTab('local') }} style={tabStyle(tab === 'local')}>Local services</button>
        <button onClick={function() { setTab('national') }} style={tabStyle(tab === 'national')}>National lines</button>
      </div>
      {tab === 'local' ? (
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <NZMap region={region} onSelect={setRegion} t={t} />
          <div style={{ flex: 1, minWidth: 0 }}>
            {local ? (
              <div>
                <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 700, color: t.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{local.label}</p>
                {local.services.map(function(r, i) { return <ResourceCard key={i} r={r} t={t} /> })}
              </div>
            ) : (
              <p style={{ fontSize: 13, color: t.muted, fontStyle: 'italic' }}>Select a city from the map</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p style={{ margin: '0 0 14px', fontSize: 13, color: t.muted }}>These lines are free and available everywhere in Aotearoa.</p>
          {NATIONAL.map(function(r, i) { return <ResourceCard key={i} r={r} t={t} /> })}
        </div>
      )}
    </div>
  )
}
