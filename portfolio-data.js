/* ============================================================
   PORTFOLIO-DATA.JS
   ------------------------------------------------------------
   This is the ONLY file you should need to edit to update the
   content of your portfolio (text, links, projects, skills,
   experience, education, contact info).

   Do NOT edit index.html or style.css for content changes —
   the page reads everything from the PORTFOLIO_DATA object
   below and builds the page automatically.

   Quick index of what's in this file:
     1. personal      -> name, role, email, social links, location
     2. hero          -> headline, availability tag, CTA buttons, tech stack
     3. about         -> intro paragraphs + quick facts list
     4. skills        -> Programming / AI-Data / Web Dev / Soft Skills
     5. projects      -> array of project cards (add/remove freely)
     6. experience    -> timeline entries + the extra note paragraph
     7. education     -> array of education entries
     8. contact       -> closing heading + subtext (links reuse `personal`)
     9. footer        -> copyright line
   ============================================================ */

const PORTFOLIO_DATA = {

  // ----------------------------------------------------------
  // 1. PERSONAL INFO
  // Edit this to change your name, role, email, or social links.
  // These values are reused across the navbar, hero, and contact
  // section automatically — change them once, here, only.
  // ----------------------------------------------------------
  personal: {
    name: "Vignesh A",
    shortName: "Vignesh A",       // used in navbar / footer
    role: "AI & Data Science Engineer",
    email: "vignesha1809@gmail.com",
    linkedin: {
      label: "Linkedin",
      url: "https://www.linkedin.com/in/vignesh-a-4403b434"
    },
    github: {
      label: "Github",
      url: "https://github.com/Vignesh180904"
    },
    location: "Tamil Nadu, India"
  },

  // ----------------------------------------------------------
  // 2. HERO SECTION
  // The big top-of-page section. Edit heading, description,
  // the two call-to-action buttons, and the small tech list.
  // ----------------------------------------------------------
  hero: {
    availabilityTag: "AVAILABLE FOR OPPORTUNITIES",
    heading: "AI & Data Science Engineer",
    description: "I build intelligent applications that combine machine learning, data science, and modern web engineering — from full-stack platforms to trained prediction models.",
    ctaPrimary: { label: "View Projects", href: "#projects" },
    ctaSecondary: { label: "Let's Connect", href: "#contact" },
    techStack: ["Python", "Machine Learning", "GenAI", "RAG", "MCP Server", "React", "MERN", "SQL"]
  },

  // ----------------------------------------------------------
  // 3. ABOUT SECTION
  // `paragraphs` renders as separate <p> tags, in order.
  // `facts` renders as the label/value rows on the right.
  // ----------------------------------------------------------
  about: {
    paragraphs: [
      "I’m a B.Tech graduate in Artificial Intelligence and Data Science from P.S.R. Engineering College, Sivakasi, with a strong interest in applied machine learning and full-stack web development. I enjoy turning ideas into practical, scalable, and user-friendly applications by combining machine learning with modern web technologies.",
      "Through internships and independent projects, I have worked with the MERN stack to build responsive web applications and developed machine learning models for image classification, forecasting, and anomaly detection, along with local LLM applications built on RAG and MCP servers. I focus on writing clean and maintainable code, understanding the problem before choosing a technology, and continuously expanding my skills across the software and AI ecosystem.",
      "I’m passionate about building real-world solutions, learning new technologies, and contributing to projects where AI and software development come together to create meaningful impact."
    ],
    facts: [
      { label: "Degree", value: "B.Tech, AI & Data Science" },
      { label: "Institution", value: "P.S.R Engineering College" },
      { label: "Graduate", value: "2026" },
      { label: "Location", value: "Tamil Nadu, India" },
      { label: "Focus areas", value: "RAG & MCP, ML / Deep Learning, MERN" }
    ]
  },

  // ----------------------------------------------------------
  // 4. SKILLS
  // Each group renders as its own card. Add/remove items from
  // any `items` array freely — the layout adjusts automatically.
  // `softSkills` renders as the small secondary row inside the
  // Web Development card (matches the original design).
  // ----------------------------------------------------------
  skills: {
    groups: [
      {
        title: "Programming",
        subtitle: "Languages & markup",
        items: ["Python", "Java", "JavaScript", "C (Basics)", "HTML", "CSS"]
      },
      {
        title: "GenAI / RAG",
        subtitle: "LLM apps & agents",
        items: ["RAG", "MCP Server", "LangGraph", "ChromaDB", "Ollama", "FastAPI", "Hybrid Search", "Evals & Telemetry"],
        highlight: ["RAG", "MCP Server"]
      },
      {
        title: "AI / Data",
        subtitle: "Modeling & analysis",
        items: ["Machine Learning", "Deep Learning", "CNN", "LSTM", "Autoencoders", "Random Forest", "SVM"]
      },
      {
        title: "Web Development",
        subtitle: "Front-end & back-end",
        items: ["React JS", "Node JS", "Express JS", "MERN"]
      }
    ],
    softSkills: {
      label: "Also brings",
      items: ["Analytical Thinking", "Communication", "Problem-Solving", "Time Management"]
    }
  },

  // ----------------------------------------------------------
  // 4b. PROJECT SUMMARY INDICATORS (small chips beside the heading)
  // ----------------------------------------------------------
  projectStats: ["6+ Projects", "AI / ML Solutions", "Full Stack Applications"],

  // ----------------------------------------------------------
  // 5. PROJECTS
  // This is the array you'll touch most often.
  //
  // Each project object supports:
  //   title       (string, required)
  //   category    (string, required)  e.g. "MERN Stack", "CNN / Deep Learning"
  //   description (string, required)
  //   features    (array of strings)  shown as small pills
  //   tech        (array of strings)  shown as "Stack: A · B · C"
  //   visual      (string, required)  which built-in SVG icon to use —
  //               one of: "documind", "rag", "leaf", "elearning", "food", "weather",
  //               "network", "heartbeat"
  //               (pick the closest match, or reuse any of these for new projects)
  //   live        (string, optional) — Live Demo URL
  //   github      (string, optional) — GitHub repo URL
  //
  // BUTTON RULES (handled automatically by script.js):
  //   - live set only    -> shows "Live Demo ↗" only
  //   - github set only  -> shows "GitHub ↗" only
  //   - both set         -> shows both buttons
  //   - neither set      -> no buttons are rendered (no fake/broken links)
  //
  // TO ADD A NEW PROJECT: copy an object below, paste it into the
  // array, and edit the fields. No HTML/CSS changes needed.
  // ----------------------------------------------------------
  projects: [
    {
      title: "DocuMind – Offline AI Document Assistant",
      category: "AI / MCP Server",
      description: "A privacy-first app that indexes PDF, Word and text files on your own PC so you can search, summarize and compare them, and ask questions answered by a local LLM with numbered, clickable source citations. It also runs as an MCP server for VS Code.",
      features: ["Hybrid search", "Cited answers", "MCP server"],
      tech: ["Python", "FastAPI", "React", "ChromaDB", "Ollama"],
      visual: "documind",
      live: "",
      github: ""
    },
    {
      title: "Agentic RAG with Telemetry & Evals",
      category: "AI / RAG",
      description: "A local RAG system that answers from your documents with page-level citations, using hybrid search, multi-model fact-checking, request tracing, and a built-in benchmark.",
      features: ["Hybrid search", "Answer verification", "Telemetry & evals"],
      tech: ["Python", "FastAPI", "LangGraph", "ChromaDB", "Ollama"],
      visual: "rag",
      live: "",
      github: ""
    },
    {
      title: "Leaf Disease Prediction",
      category: "CNN / Deep Learning",
      description: "An image classification model that identifies plant diseases from leaf photographs using a convolutional neural network.",
      features: ["Image classification", "CNN"],
      tech: ["Convolutional Neural Network"],
      visual: "leaf",
      live: "",
      github: ""
    },
    {
      title: "E-Learning Platform",
      category: "MERN Stack",
      description: "A full-stack education application covering user authentication, video-based lessons, and structured course management.",
      features: ["User authentication", "Video content", "Course management"],
      tech: ["MongoDB", "Express", "React", "Node.js"],
      visual: "elearning",
      live: "",
      github: ""
    },
    {
      title: "Food Delivery System",
      category: "MERN Stack",
      description: "An ordering platform built around a shopping cart, live order tracking, and a dedicated admin panel for managing orders.",
      features: ["Cart", "Order tracking", "Admin panel"],
      tech: ["MongoDB", "Express", "React", "Node.js"],
      visual: "food",
      live: "",
      github: ""
    },

    
    {
      title: "Weather Prediction",
      category: "Machine Learning",
      description: "A forecasting model that predicts rainfall and temperature patterns, comparing Random Forest and SVM approaches.",
      features: ["Rainfall forecasting", "Temperature forecasting"],
      tech: ["Random Forest", "SVM"],
      visual: "weather",
      live: "",
      github: ""
    },
    

    /* EXAMPLE — copy this block to add a new project:
    {
      title: "My New AI Project",
      category: "Machine Learning",
      description: "My project description",
      features: ["Feature 1", "Feature 2"],
      tech: ["Python", "TensorFlow"],
      visual: "network",           // reuse "elearning" | "network" | "leaf" | "weather" | "heartbeat"
      live: "https://example.com",
      github: "https://github.com/example/repo"
    },
    */
  ],

  // ----------------------------------------------------------
  // 6. EXPERIENCE
  // `timeline` renders as the vertical timeline, in order.
  // `note` is the extra paragraph shown below the timeline —
  // set it to "" (empty string) to hide it entirely.
  // ----------------------------------------------------------
  experience: {
    timeline: [
      {
        date: "Jun 2024 — Aug 2024",
        role: "Web Development Intern",
        org: "Vini Tech",
        points: [
          "Developed responsive websites using HTML, CSS, JavaScript, and React JS.",
          "Optimized website performance and ensured cross-browser compatibility."
        ]
      },
      {
        date: "Dec 2024 — Jan 2025",
        role: "Data Science Intern",
        org: "IDEADEVY",
        points: [
          "Contributed to website development with integrated data-driven components.",
          "Completed key modules independently and delivered them on time."
        ]
      }
    ],
    note: "Alongside these internships, I've worked on developing and maintaining web applications for internal and client needs — updating and improving existing codebases in JavaScript and React, and collaborating with teams in Agile environments on feature development and bug fixing."
  },

  // ----------------------------------------------------------
  // 7. EDUCATION
  // Array of entries, rendered top to bottom in the order given.
  // ----------------------------------------------------------
  education: [
    {
      years: "2022 — 2026",
      degree: "B.Tech, Artificial Intelligence and Data Science",
      school: "P.S.R Engineering College, Sivakasi, Tamil Nadu",
      score: "CGPA 8.2 / 10"
    },
    {
      years: "2022",
      degree: "Higher Secondary Certificate (HSC)",
      school: "Nadar Mahamai Higher Secondary School, Tamil Nadu",
      score: "76.6%"
    }
  ],

  // ----------------------------------------------------------
  // 8. CONTACT SECTION
  // Heading + subtext only — the actual email/LinkedIn/GitHub
  // links are pulled from `personal` above automatically, so
  // you never need to update them in two places.
  // ----------------------------------------------------------
  contact: {
    heading: "Let's build something intelligent.",
    subtext: "Open to internships, entry-level roles, and collaborative projects in AI, data science, and full-stack development."
  },

  // ----------------------------------------------------------
  // 9. FOOTER
  // ----------------------------------------------------------
  footer: {
    year: "2026",
    tagline: "Built with HTML, CSS & JavaScript"
  }

};

// Expose globally so script.js (loaded after this file) can read it.
window.PORTFOLIO_DATA = PORTFOLIO_DATA;
