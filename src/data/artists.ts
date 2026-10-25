import { Artist } from '../types';
import dhurvaStudioImg from '../assets/images/artist_dhurva_studio_1792911810794.jpg';
import solitudeImg from '../assets/images/art_painting_solitude_1792846059367.jpg';
import monolithImg from '../assets/images/art_sculpture_monolith_1792846059660.jpg';
import botanicalImg from '../assets/images/art_painting_botanical_1792846059830.jpg';
import celestialImg from '../assets/images/art_sculpture_celestial_1792846059723.jpg';

export const ARTISTS_DATA: Artist[] = [
  {
    id: 'artist-dhurva',
    name: 'Dhurva',
    role: 'Studio Founder & Principal Fine Artist',
    origin: 'New Delhi & Paris',
    bio: 'Dhurva is a contemporary visionary painter and mixed-media creator whose practice bridges ancient Vedic spatial philosophy with Western abstract expressionism. Working on expansive Belgian linen and hand-distressed architectural supports, Dhurva incorporates volcanic mineral pigments, raw sienna, bone ash, and beaten 24k gold leaf.',
    statement: 'Art is an act of listening before it is an act of making. When you stand before a canvas, the pigment must quiet the mind until you hear the space between thoughts.',
    portrait: dhurvaStudioImg,
    disciplines: ['Monumental Oil', 'Gold Leaf Impasto', 'Tactile Linen'],
    activeExhibitions: [
      'The Vernissage 2026: Spatial Survey',
      'Venice Architecture Biennale (Collateral Event)',
      'Grand Palais Éphémère Retrospective',
    ],
    education: 'École Nationale Supérieure des Beaux-Arts, Paris & Faculty of Fine Arts, MS University',
  },
  {
    id: 'artist-helene-vance',
    name: 'Hélène Vance',
    role: 'Resident Master Painter',
    origin: 'Paris, France',
    bio: 'Born in Montmartre and based in Belleville, Vance is revered for her tactile tectonic compositions. Her work has entered public foundations in Zurich, Kyoto, and London. She constructs rich impasto reliefs that register time like geological sedimentary beds.',
    statement: 'I treat the canvas not as a picture plane, but as an excavated fragment of earth where light becomes tangible.',
    portrait: solitudeImg,
    disciplines: ['Oil & Wax Medium', 'Raw Pigment', 'Minimalist Abstraction'],
    activeExhibitions: ['Material Whispers: The Vernissage 2026', 'Palais de Tokyo Residency Show'],
    education: 'École des Beaux-Arts, Lyon',
  },
  {
    id: 'artist-marcus-thorne',
    name: 'Marcus Thorne',
    role: 'Resident Master Sculptor',
    origin: 'London, United Kingdom',
    bio: 'Thorne works between his foundry in Cornwall and studio in South London. His monumental cast bronzes explore gravity, equilibrium, and negative space. His sculptures are held in major public sculpture parks across Europe and Asia.',
    statement: 'Sculpture is the dialogue between weight and the emptiness that surrounds it. The aperture through bronze is as important as the metal.',
    portrait: monolithImg,
    disciplines: ['Lost-Wax Bronze', 'Belgian Black Granite', 'Kinetic Balance'],
    activeExhibitions: ['Silence & Gravity: Spatial Survey', 'Yorkshire Sculpture Park Triennial'],
    education: 'Royal College of Art, London',
  },
  {
    id: 'artist-camille-laurent',
    name: 'Camille Laurent',
    role: 'Contemporary Painter',
    origin: 'Geneva, Switzerland',
    bio: 'Laurent constructs dense, rhythmic landscape topographies using heavy palette knives and cold-wax preparations. Her palette is informed by alpine botanical strata, deep viridian lichen, and raw glacial minerals.',
    statement: 'The rhythm of the knife is a heartbeat. When applying raw pigment at velocity, intention becomes nature itself.',
    portrait: botanicalImg,
    disciplines: ['Palette Knife Oil', 'Mineral Wax', 'Textural Flora'],
    activeExhibitions: ['Material Whispers: The Vernissage 2026', 'Kunsthalle Basel Solo Showcase'],
    education: 'Haute École d’Art et de Design (HEAD), Geneva',
  },
  {
    id: 'artist-anya-rostova',
    name: 'Anya Rostova',
    role: 'Architectural Sculptor',
    origin: 'Vienna, Austria',
    bio: 'Rostova carves translucent Spanish alabaster and balances it with geometric brushed satin brass arches. Her work creates dynamic kinetic interactions with ambient sunlight, glowing from within when illuminated.',
    statement: 'Alabaster remembers light. By carving it thin enough to breathe, stone transitions from opaque mineral into glowing luminescence.',
    portrait: celestialImg,
    disciplines: ['Carved Alabaster', 'Architectural Brass', 'Light Kinetics'],
    activeExhibitions: ['Forms of Illumination: Winter Solstice', 'Vienna Secession Pavilion'],
    education: 'University of Applied Arts, Vienna',
  },
];
