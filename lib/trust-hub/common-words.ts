/**
 * Top 1000 Most Common English Words
 * Used for lexical rareness detection
 */
export const COMMON_WORDS = new Set([
    // Articles, pronouns, prepositions
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
    "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
    "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
    "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",

    // Common verbs
    "go", "about", "out", "up", "them", "then", "so", "can", "who", "get",
    "if", "make", "know", "take", "see", "come", "think", "look", "want", "give",
    "use", "find", "tell", "ask", "work", "seem", "feel", "try", "leave", "call",
    "good", "new", "first", "last", "long", "great", "little", "own", "other", "old",
    "right", "big", "high", "different", "small", "large", "next", "early", "young", "important",

    // Common nouns
    "man", "year", "way", "day", "thing", "woman", "life", "child", "world", "school",
    "state", "family", "student", "group", "country", "problem", "hand", "part", "place", "case",
    "week", "company", "system", "program", "question", "work", "government", "number", "night", "point",
    "home", "water", "room", "mother", "area", "money", "story", "fact", "month", "lot",
    "right", "study", "book", "eye", "job", "word", "business", "issue", "side", "kind",
    "head", "house", "service", "friend", "father", "power", "hour", "game", "line", "end",
    "member", "law", "car", "city", "community", "name", "president", "team", "minute", "idea",
    "kid", "body", "information", "back", "parent", "face", "others", "level", "office", "door",

    // Time and numbers
    "time", "today", "year", "week", "month", "hour", "minute", "second",
    "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
    "first", "second", "third", "last", "next", "previous", "current", "past", "future",

    // Common adjectives
    "new", "good", "high", "old", "great", "big", "small", "large", "long", "short",
    "early", "late", "young", "important", "public", "bad", "same", "able", "social", "national",
    "political", "economic", "financial", "medical", "legal", "local", "federal", "international",
    "real", "sure", "certain", "clear", "simple", "hard", "difficult", "easy", "possible",
    "full", "free", "available", "necessary", "recent", "current", "common", "special", "particular",

    // Common adverbs
    "very", "just", "too", "also", "well", "only", "even", "still", "however", "actually",
    "really", "always", "never", "often", "sometimes", "usually", "perhaps", "maybe", "probably",
    "certainly", "definitely", "clearly", "simply", "exactly", "basically", "generally", "especially",
    "particularly", "specifically", "quite", "rather", "almost", "already", "ever", "yet", "again",

    // Common conjunctions/transitions
    "because", "when", "where", "while", "although", "though", "unless", "until", "before", "after",
    "since", "whether", "either", "neither", "both", "between", "among", "through", "during", "according",

    // Modal verbs
    "can", "could", "may", "might", "must", "shall", "should", "will", "would",

    // Question words
    "what", "who", "which", "when", "where", "why", "how", "whose", "whom",

    // Common verbs (additional)
    "become", "show", "keep", "let", "begin", "help", "talk", "turn", "start", "run",
    "move", "like", "live", "believe", "hold", "bring", "happen", "write", "provide", "sit",
    "stand", "lose", "pay", "meet", "include", "continue", "set", "learn", "change", "lead",
    "understand", "watch", "follow", "stop", "create", "speak", "read", "allow", "add", "spend",
    "grow", "open", "walk", "win", "offer", "remember", "love", "consider", "appear", "buy",
    "wait", "serve", "die", "send", "expect", "build", "stay", "fall", "cut", "reach",
    "kill", "remain", "suggest", "raise", "pass", "sell", "require", "report", "decide", "pull",

    // Technology & modern
    "technology", "computer", "internet", "email", "phone", "website", "online", "digital",
    "data", "software", "system", "network", "application", "user", "account", "password",

    // Education
    "education", "teacher", "student", "school", "university", "college", "class", "course",
    "study", "learn", "test", "exam", "grade", "degree", "research", "professor",

    // Business
    "business", "company", "market", "product", "service", "customer", "price", "cost",
    "value", "quality", "management", "organization", "development", "project", "plan",

    // Additional common words
    "between", "through", "during", "process", "result", "experience", "reason", "support",
    "list", "form", "position", "effect", "rate", "force", "order", "picture", "field",
    "return", "interest", "control", "activity", "action", "event", "history", "public",
    "human", "health", "individual", "someone", "something", "everyone", "everything", "anyone",
    "anything", "nobody", "nothing", "somewhere", "anywhere", "nowhere", "example", "evidence",
    "research", "policy", "decision", "knowledge", "science", "technology", "method", "approach",

    // Pronouns & possessives
    "me", "him", "us", "your", "mine", "yours", "ours", "theirs", "myself", "yourself",
    "himself", "herself", "itself", "ourselves", "themselves",

    // Common phrases components
    "kind", "sort", "type", "way", "means", "matter", "sense", "mind", "person", "people",
    "change", "course", "times", "words", "space", "land", "sound", "place", "hand", "keep",

    // More verbs
    "produce", "receive", "base", "involve", "exist", "recognize", "develop", "describe",
    "establish", "note", "indicate", "identify", "reduce", "increase", "determine", "regard",
    "contain", "claim", "define", "relate", "represent", "express", "assume", "consist",

    // Filler/connector words
    "however", "therefore", "thus", "hence", "moreover", "furthermore", "additionally",
    "meanwhile", "otherwise", "instead", "besides", "anyway", "indeed", "certainly",

    // Common prefixes/suffixes handling
    "able", "less", "ness", "ment", "tion", "able", "ible", "ful", "ing", "ed",

    // More modern/common
    "media", "social", "video", "image", "article", "post", "comment", "share", "like",
    "follow", "search", "click", "download", "upload", "login", "logout", "sign", "join"
]);
