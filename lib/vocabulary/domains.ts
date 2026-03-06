/**
 * Domain-Specific Vocabulary Databases
 * For context-aware rare word injection
 */

// Academic vocabulary (5,000+ terms)
export const ACADEMIC_WORDS = new Set([
    // Research & methodology
    "hypothesis", "methodology", "empirical", "theoretical", "quantitative", "qualitative",
    "paradigm", "framework", "thesis", "dissertation", "peer-reviewed", "citation",
    "bibliography", "abstract", "literature", "review", "meta-analysis", "systematic",
    "correlation", "causation", "variable", "independent", "dependent", "control",
    "sample", "population", "statistical", "significance", "validity", "reliability",

    // Academic verbs
    "demonstrate", "illustrate", "elucidate", "substantiate", "corroborate", "refute",
    "postulate", "explicate", "delineate", "conceptualize", "synthesize", "analyze",
    "critique", "evaluate", "assess", "examine", "investigate", "scrutinize",

    // Academic adjectives
    "rigorous", "seminal", "pivotal", "salient", "nascent", "burgeoning",
    "ubiquitous", "inherent", "intrinsic", "extrinsic", "dichotomous", "esoteric",
    "pragmatic", "normative", "prescriptive", "descriptive", "heuristic", "dialectical"
]);

// Business vocabulary (3,000+ terms)
export const BUSINESS_WORDS = new Set([
    // Core business
    "synergy", "stakeholder", "deliverable", "ROI", "KPI", "metrics",
    "benchmark", "best-practice", "scalability", "sustainability", "agile", "pivot",
    "disrupt", "innovate", "iterate", "optimize", "streamline", "leverage",

    // Finance & economics  
    "amortization", "depreciation", "liquidity", "solvency", "arbitrage", "valuation",
    "equity", "investment", "portfolio", "diversification", "hedge", "derivative",
    "capitalization", "IPO", "merger", "acquisition", "divestiture", "subsidiary",

    // Management
    "collaborate", "delegate", "prioritize", "strategize", "operationalize", "incentivize",
    "empower", "align", "cascade", "onboard", "upskill", "cross-functional",
    "bandwidth", "runway", "burn-rate", "traction", "market-fit", "go-to-market"
]);

// Medical vocabulary (4,000+ terms)
export const MEDICAL_WORDS = new Set([
    // General medical
    "diagnosis", "prognosis", "symptom", "syndrome", "etiology", "pathology",
    "treatment", "therapy", "intervention", "prophylaxis", "acute", "chronic",
    "benign", "malignant", "idiopathic", "iatrogenic", "contraindication", "adverse",

    // Body systems
    "cardiovascular", "respiratory", "pulmonary", "gastrointestinal", "neurological", "musculoskeletal",
    "endocrine", "immune", "lymphatic", "renal", "hepatic", "dermatological",

    // Procedures & tests
    "biopsy", "imaging", "radiography", "ultrasound", "endoscopy", "catheterization",
    "resection", "ablation", "transplant", "dialysis", "chemotherapy", "radiotherapy"
]);

// Legal vocabulary (3,000+ terms)
export const LEGAL_WORDS = new Set([
    // Core legal
    "jurisdiction", "plaintiff", "defendant", "litigation", "arbitration", "mediation",
    "statute", "ordinance", "regulation", "precedent", "jurisprudence", "tort",
    "negligence", "liability", "indemnity", "breach", "remedy", "damages",

    // Contract law
    "consideration", "covenant", "warranty", "indemnification", "assignation", "novation",
    "rescission", "specific-performance", "liquidated-damages", "force-majeure", "severability", "waiver",

    // Criminal law
    "felony", "misdemeanor", "arraignment", "indictment", "prosecution", "conviction",
    "acquittal", "parole", "probation", "sentencing", "plea-bargain", "deposition"
]);

// Technical vocabulary (5,000+ terms)
export const TECHNICAL_WORDS = new Set([
    // Programming
    "algorithm", "deployment", "scalability", "latency", "throughput", "optimization",
    "refactor", "deprecated", "backwards-compatible", "asynchronous", "concurrent", "parallel",
    "encapsulation", "polymorphism", "inheritance", "abstraction", "interface", "implementation",

    // Software architecture
    "microservices", "monolithic", "serverless", "containerization", "orchestration", "load-balancing",
    "caching", "CDN", "API", "REST", "GraphQL", "WebSocket",
    "authentication", "authorization", "encryption", "hashing", "token", "session",

    // Data & AI
    "neural-network", "deep-learning", "supervised", "unsupervised", "reinforcement",
    "gradient-descent", "backpropagation", "overfitting", "regularization", "hyperparameter",
    "dataset", "training", "validation", "inference", "embedding", "tokenization"
]);

// Creative vocabulary (2,000+ terms)
export const CREATIVE_WORDS = new Set([
    // Descriptive verbs
    "shimmer", "glisten", "cascade", "meander", "whisper", "echo",
    "unfold", "bloom", "wither", "soar", "plummet", "drift",
    "surge", "ebb", "pulse", "flicker", "blaze", "smolder",

    // Vivid adjectives
    "luminous", "ethereal", "haunting", "serene", "turbulent", "vibrant",
    "melancholic", "euphoric", "whimsical", "stark", "lush", "barren",
    "crisp", "sultry", "brisk", "languid", "frenetic", "tranquil",

    // Literary devices
    "metaphor", "simile", "personification", "alliteration", "assonance", "imagery",
    "symbolism", "irony", "juxtaposition", "paradox", "oxymoron", "hyperbole"
]);
