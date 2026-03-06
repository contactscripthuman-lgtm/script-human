/**
 * Brand Guardrails - Vocabulary Governor
 * Enforces brand compliance by blocking Silicon Smog words and suggesting approved alternatives
 */

export interface BrandProfile {
    name: string;
    blacklist: string[];
    approvedTerms: Map<string, string[]>; // Maps blocked words to approved alternatives
    complianceThreshold: number; // Minimum acceptable compliance score (0-1)
}

export interface ViolationDetection {
    word: string;
    position: number;
    suggestions: string[];
    severity: 'high' | 'medium' | 'low';
}

export interface ComplianceResult {
    score: number; // 0-100
    violations: ViolationDetection[];
    sanitizedText: string;
    changesApplied: number;
}

// Comprehensive Silicon Smog blacklist (50+ terms)
export const DEFAULT_BLACKLIST = [
    // Vague intensifiers
    'delve', 'leverage', 'utilize', 'harness', 'optimize', 'maximize', 'streamline',

    // Corporate jargon
    'synergy', 'paradigm', 'ecosystem', 'bandwidth', 'granular', 'actionable',
    'scalable', 'robust', 'holistic', 'strategic', 'tactical', 'proactive',

    // Buzzwords
    'cutting-edge', 'next-generation', 'state-of-the-art', 'best-in-class',
    'world-class', 'industry-leading', 'innovative', 'revolutionary', 'game-changing',
    'transformative', 'disruptive', 'groundbreaking',

    // Vague actions
    'facilitate', 'empower', 'enable', 'drive', 'champion', 'spearhead',
    'orchestrate', 'amplify', 'catalyze', 'monetize',

    // Overused modifiers
    'seamless', 'frictionless', 'turnkey', 'end-to-end', 'mission-critical',
    'value-added', 'best-of-breed', 'future-proof',

    // AI-specific tells
    'noteworthy', 'underscores', 'elucidates', 'encompasses', 'exemplifies',
    'multifaceted', 'myriad', 'plethora', 'intricate', 'nuanced'
];

// Banned multi-word phrases (context matters)
export const BANNED_PHRASES = [
    'it is important to note',
    'it should be noted',
    'it is worth noting',
    'moving forward',
    'at the end of the day',
    'think outside the box',
    'low-hanging fruit',
    'win-win situation',
    'circle back',
    'touch base',
    'take this offline',
    'deep dive',
    'drill down',
    'on the same page',
    'synergize efforts',
    'leverage synergies',
    'paradigm shift',
    'game changer',
    'in this day and age',
    'needless to say'
];

// Enhanced approved alternatives with context awareness
export const DEFAULT_ALTERNATIVES: Record<string, string[]> = {
    'delve': ['explore', 'examine', 'investigate', 'look into', 'study'],
    'leverage': ['use', 'apply', 'employ', 'utilize', 'tap into'],
    'utilize': ['use', 'apply', 'employ'],
    'harness': ['use', 'employ', 'capture', 'exploit'],
    'synergy': ['collaboration', 'teamwork', 'cooperation', 'partnership', 'combined effort'],
    'paradigm': ['model', 'pattern', 'approach', 'framework', 'method'],
    'robust': ['strong', 'reliable', 'solid', 'sturdy', 'dependable'],
    'holistic': ['complete', 'comprehensive', 'unified', 'integrated', 'overall'],
    'ecosystem': ['environment', 'network', 'system', 'community', 'landscape'],
    'cutting-edge': ['advanced', 'modern', 'latest', 'contemporary', 'up-to-date'],
    'next-generation': ['new', 'advanced', 'improved', 'modern', 'updated'],
    'revolutionary': ['groundbreaking', 'transformative', 'major', 'significant', 'radical'],
    'game-changing': ['transformative', 'significant', 'impactful', 'major', 'pivotal'],
    'innovative': ['creative', 'novel', 'original', 'fresh', 'new'],
    'optimize': ['improve', 'enhance', 'refine', 'perfect', 'upgrade'],
    'maximize': ['increase', 'boost', 'expand', 'grow', 'raise'],
    'streamline': ['simplify', 'improve', 'refine', 'smooth', 'ease'],
    'facilitate': ['help', 'enable', 'support', 'assist', 'aid'],
    'empower': ['enable', 'support', 'help', 'allow', 'equip'],
    'disrupt': ['change', 'transform', 'reshape', 'alter', 'revolutionize'],
    'seamless': ['smooth', 'integrated', 'unified', 'effortless', 'easy'],
    'bandwidth': ['capacity', 'resources', 'time', 'availability', 'capability'],
    'granular': ['detailed', 'specific', 'precise', 'fine', 'exact'],
    'actionable': ['practical', 'usable', 'applicable', 'workable', 'doable'],
    'scalable': ['expandable', 'flexible', 'adaptable', 'growable', 'adjustable'],
    'strategic': ['planned', 'deliberate', 'calculated', 'thoughtful', 'purposeful'],
    'tactical': ['practical', 'hands-on', 'operational', 'concrete', 'specific'],
    'proactive': ['forward-thinking', 'anticipatory', 'preventive', 'prepared', 'ready'],
    'state-of-the-art': ['advanced', 'modern', 'latest', 'current', 'contemporary'],
    'best-in-class': ['excellent', 'top-tier', 'superior', 'outstanding', 'premier'],
    'world-class': ['excellent', 'top-quality', 'outstanding', 'exceptional', 'superior'],
    'industry-leading': ['top', 'leading', 'foremost', 'premier', 'pioneering'],
    'transformative': ['significant', 'major', 'impactful', 'important', 'substantial'],
    'groundbreaking': ['pioneering', 'innovative', 'original', 'novel', 'new'],
    'drive': ['lead', 'push', 'advance', 'promote', 'further'],
    'champion': ['support', 'advocate', 'promote', 'back', 'endorse'],
    'spearhead': ['lead', 'head', 'direct', 'guide', 'manage'],
    'orchestrate': ['organize', 'coordinate', 'arrange', 'manage', 'plan'],
    'amplify': ['increase', 'boost', 'strengthen', 'enhance', 'expand'],
    'catalyze': ['trigger', 'spark', 'initiate', 'start', 'launch'],
    'monetize': ['profit from', 'earn from', 'make money from', 'capitalize on'],
    'frictionless': ['smooth', 'easy', 'effortless', 'simple', 'straightforward'],
    'turnkey': ['ready-made', 'complete', 'ready-to-use', 'finished', 'pre-built'],
    'end-to-end': ['complete', 'full', 'comprehensive', 'total', 'entire'],
    'mission-critical': ['essential', 'vital', 'crucial', 'critical', 'necessary'],
    'value-added': ['beneficial', 'helpful', 'useful', 'valuable', 'worthwhile'],
    'best-of-breed': ['top-quality', 'excellent', 'superior', 'best', 'finest'],
    'future-proof': ['lasting', 'durable', 'long-term', 'sustainable', 'enduring'],
    'noteworthy': ['notable', 'significant', 'important', 'remarkable', 'impressive'],
    'underscores': ['emphasizes', 'highlights', 'shows', 'demonstrates', 'illustrates'],
    'elucidates': ['clarifies', 'explains', 'reveals', 'shows', 'demonstrates'],
    'encompasses': ['includes', 'contains', 'covers', 'involves', 'comprises'],
    'exemplifies': ['demonstrates', 'shows', 'illustrates', 'represents', 'embodies'],
    'multifaceted': ['complex', 'varied', 'diverse', 'many-sided', 'versatile'],
    'myriad': ['many', 'numerous', 'countless', 'various', 'multiple'],
    'plethora': ['abundance', 'wealth', 'many', 'plenty', 'lots'],
    'intricate': ['complex', 'detailed', 'complicated', 'elaborate', 'involved'],
    'nuanced': ['subtle', 'complex', 'refined', 'sophisticated', 'detailed']
};

/**
 * Create a default brand profile
 */
export function createDefaultProfile(): BrandProfile {
    return {
        name: 'Default Profile',
        blacklist: DEFAULT_BLACKLIST,
        approvedTerms: new Map(Object.entries(DEFAULT_ALTERNATIVES)),
        complianceThreshold: 0.85
    };
}

/**
 * Detect phrase violations in text
 */
function detectPhraseViolations(text: string): ViolationDetection[] {
    const violations: ViolationDetection[] = [];
    const lowerText = text.toLowerCase();

    BANNED_PHRASES.forEach(phrase => {
        let startIndex = 0;
        let index;

        while ((index = lowerText.indexOf(phrase, startIndex)) !== -1) {
            violations.push({
                word: phrase,
                position: index,
                suggestions: ['Remove this phrase for clearer communication'],
                severity: 'high'
            });
            startIndex = index + phrase.length;
        }
    });

    return violations;
}

/**
 * Calculate severity based on word frequency in text
 */
function calculateSeverity(word: string, text: string, hasSuggestions: boolean): 'high' | 'medium' | 'low' {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = text.match(regex);
    const frequency = matches ? matches.length : 0;

    // High severity: word appears multiple times OR no suggestions available
    if (frequency > 2 || !hasSuggestions) return 'high';

    // Medium severity: word appears 2 times
    if (frequency === 2) return 'medium';

    // Low severity: word appears once
    return 'low';
}

/**
 * Enhanced violation detection with phrase matching and severity scoring
 */
export function detectViolations(text: string, profile: BrandProfile): ViolationDetection[] {
    const violations: ViolationDetection[] = [];
    const processedPositions = new Set<number>(); // Avoid duplicate detections

    // First, detect phrase violations
    const phraseViolations = detectPhraseViolations(text);
    phraseViolations.forEach(v => {
        violations.push(v);
        // Mark positions as processed
        for (let i = v.position; i < v.position + v.word.length; i++) {
            processedPositions.add(i);
        }
    });

    // Then detect word violations with enhanced matching
    const words = text.split(/\b/);
    let position = 0;

    words.forEach((word) => {
        // Skip if position already processed by phrase detection
        if (processedPositions.has(position)) {
            position += word.length;
            return;
        }

        const cleanWord = word.toLowerCase().replace(/[^a-z-]/g, '');

        if (cleanWord && profile.blacklist.includes(cleanWord)) {
            const suggestions = profile.approvedTerms.get(cleanWord) || [];
            const severity = calculateSeverity(cleanWord, text, suggestions.length > 0);

            violations.push({
                word: cleanWord,
                position,
                suggestions,
                severity
            });
        }

        position += word.length;
    });

    // Sort by position for consistent ordering
    return violations.sort((a, b) => a.position - b.position);
}

/**
 * Calculate brand compliance score
 */
export function calculateCompliance(text: string, profile: BrandProfile): number {
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const violations = detectViolations(text, profile);

    if (words.length === 0) return 100;

    const complianceRatio = 1 - (violations.length / words.length);
    return Math.max(0, Math.min(100, complianceRatio * 100));
}

/**
 * Sanitize text by replacing violations with approved terms
 */
export function sanitizeText(text: string, profile: BrandProfile): ComplianceResult {
    const violations = detectViolations(text, profile);
    let sanitizedText = text;
    let changesApplied = 0;

    // Sort violations by position (descending) to avoid offset issues
    const sortedViolations = [...violations].sort((a, b) => b.position - a.position);

    sortedViolations.forEach(violation => {
        if (violation.suggestions.length > 0) {
            const replacement = violation.suggestions[0]; // Use first suggestion
            const regex = new RegExp(`\\b${violation.word}\\b`, 'gi');
            const matches = Array.from(sanitizedText.matchAll(regex));

            if (matches.length > 0) {
                sanitizedText = sanitizedText.replace(regex, replacement);
                changesApplied++;
            }
        }
    });

    const finalScore = calculateCompliance(sanitizedText, profile);

    return {
        score: finalScore,
        violations,
        sanitizedText,
        changesApplied
    };
}

/**
 * Real-time analyzer for editor integration
 */
export interface RealTimeAnalysisResult {
    violations: ViolationDetection[];
    score: number;
    status: 'compliant' | 'warning' | 'critical';
}

export function analyzeRealTime(text: string, profile: BrandProfile): RealTimeAnalysisResult {
    const violations = detectViolations(text, profile);
    const score = calculateCompliance(text, profile);

    let status: 'compliant' | 'warning' | 'critical' = 'compliant';
    if (score < profile.complianceThreshold * 100) {
        status = 'critical';
    } else if (violations.length > 0) {
        status = 'warning';
    }

    return {
        violations,
        score,
        status
    };
}
