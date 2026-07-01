export const TYPE_LABELS = {
  crisis:    { label: 'Crisis line',  color: '#ef4444' },
  community: { label: 'Community',    color: '#42b883' },
  maori:     { label: 'Maori health', color: '#f59e0b' },
}

export const NATIONAL = [
  { name: '1737', type: 'crisis', phone: '1737', url: 'https://1737.org.nz', desc: 'Free call or text anytime. Trained counsellors, 24/7.' },
  { name: 'Lifeline', type: 'crisis', phone: '0800 543 354', url: 'https://www.lifeline.org.nz', desc: 'Free 24/7 helpline for anyone struggling.' },
  { name: 'Samaritans', type: 'crisis', phone: '0800 726 666', url: 'https://www.samaritans.org.nz', desc: 'Confidential emotional support, no judgement.' },
  { name: 'Youthline', type: 'community', phone: '0800 376 633', url: 'https://www.youthline.co.nz', desc: 'For young people. Call, text, or chat online.' },
  { name: 'Alcohol Drug Helpline', type: 'crisis', phone: '0800 787 797', url: 'https://alcoholdrughelp.org.nz', desc: 'Free support for anyone affected by alcohol or drugs.' },
  { name: 'Skylight', type: 'community', phone: '0800 299 100', url: 'https://skylight.org.nz', desc: 'Support through loss, trauma, and grief.' },
]

export const REGIONS = {
  wellington: {
    label: 'Wellington',
    services: [
      { name: 'Ora Toa Health', type: 'maori', phone: '04 237 5152', url: 'https://www.oratoa.co.nz', desc: 'Maori health provider, Porirua and Kapiti.' },
      { name: 'Wellington City Mission', type: 'community', phone: '04 384 3635', url: 'https://www.wellingtoncitymission.org.nz', desc: 'Food, housing, social support.' },
      { name: 'Emerge Aotearoa Wellington', type: 'community', phone: '04 803 3800', url: 'https://www.emerge.org.nz', desc: 'Mental health and addiction recovery support.' },
    ],
  },
  auckland: {
    label: 'Auckland',
    services: [
      { name: 'Tupuna Hauora', type: 'maori', phone: '09 836 7576', url: 'https://tupunahauora.org.nz', desc: 'Maori health services, West Auckland.' },
      { name: 'Auckland City Mission', type: 'community', phone: '09 303 9700', url: 'https://www.aucklandcitymission.org.nz', desc: 'Food, housing, social support.' },
      { name: 'Lifewise', type: 'community', phone: '09 589 0050', url: 'https://www.lifewise.org.nz', desc: 'Community support, housing, mental health.' },
      { name: 'Raukura Hauora o Tainui', type: 'maori', phone: '09 636 0916', url: null, desc: 'Maori health, South Auckland.' },
    ],
  },
  christchurch: {
    label: 'Christchurch',
    services: [
      { name: 'Te Korowai Atawhai', type: 'maori', phone: '03 982 1160', url: null, desc: 'Kaupapa Maori mental health, Canterbury.' },
      { name: 'Emerge Aotearoa Christchurch', type: 'community', phone: '03 366 0539', url: 'https://www.emerge.org.nz', desc: 'Recovery support and housing services.' },
      { name: 'Christchurch City Mission', type: 'community', phone: '03 366 8881', url: 'https://www.citymission.org.nz', desc: 'Food, shelter, and social support.' },
    ],
  },
  hamilton: {
    label: 'Hamilton',
    services: [
      { name: 'Te Korowai Aroha', type: 'maori', phone: '07 839 0510', url: null, desc: 'Maori health provider, Hamilton and Waikato.' },
      { name: 'Waikato Refuge', type: 'community', phone: '07 839 4905', url: 'https://www.waikatorefuge.org.nz', desc: 'Support for those experiencing family harm.' },
    ],
  },
  dunedin: {
    label: 'Dunedin',
    services: [
      { name: 'Otago Maori Mental Health', type: 'maori', phone: '03 474 7788', url: null, desc: 'Kaupapa Maori mental health, Otago region.' },
      { name: 'Presbyterian Support Otago', type: 'community', phone: '03 474 0794', url: 'https://www.psotago.org.nz', desc: 'Community social services across the South Island.' },
    ],
  },
}
