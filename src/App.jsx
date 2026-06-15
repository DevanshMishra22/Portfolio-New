import { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  Terminal,
  Award,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ArrowRight,
  Send,
  Layers,
  CheckCircle2,
  ChevronRight,
  Download,
  Sparkles,
  MessageSquare,
  Laptop,
  Code,
  User,
  Coffee,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [skillTab, setSkillTab] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");

  // Custom Typing Effect Hook State
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = [
    "Frontend Developer",
    "React Specialist",
    "Winner of Performer of the Quarter 3x",
    "Best Developer of the Year 2025",
    "Shopify & Liquid Creator",
    "WordPress Developer",
  ];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const waitBeforeDelete = 2000;

  // Chat Simulator State
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hey there! 👋 I am Devansh's virtual assistant. Ask me anything about his experience, skills, achievements, or availability!",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Contact Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle sticky nav & scroll spy
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Simple Scrollspy
      const sections = [
        "hero",
        "experience",
        "skills",
        "projects",
        "chat",
        "contact",
      ];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ensure the site loads on the hero section on first visit
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      if (window.location.hash) {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }
      window.scrollTo({ top: 0, behavior: "auto" });
      setActiveSection("hero");
    }
  }, []);

  useEffect(() => {
    const handlePageShow = (event) => {
      if (
        event.persisted ||
        window.performance?.getEntriesByType("navigation")[0]?.type === "reload"
      ) {
        window.scrollTo({ top: 0, behavior: "auto" });
        setActiveSection("hero");
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  // Typing Effect Loop
  useEffect(() => {
    let timer;
    const currentFullText = roles[roleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentFullText.substring(0, typedText.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentFullText.substring(0, typedText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && typedText === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), waitBeforeDelete);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      colors: ["#8b5cf6", "#06b6d4", "#ec4899", "#fbbf24"],
      origin: { y: 0.65 },
    });
  };

  const triggerDoubleConfetti = () => {
    triggerConfetti();
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 250);
  };

  // Bot Answer Logic
  const getBotResponse = (userInput) => {
    const text = userInput.toLowerCase();

    if (
      text.includes("skill") ||
      text.includes("tech") ||
      text.includes("language") ||
      text.includes("stack")
    ) {
      return "Devansh is highly skilled in Frontend Development. Core Stack: React.js, Redux, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap, and Sass. He also works with Shopify Theme Dev (Liquid) and WordPress.";
    }
    if (
      text.includes("award") ||
      text.includes("achieve") ||
      text.includes("star") ||
      text.includes("performer")
    ) {
      return "He won the 'Singsys Star' award (performer of the quarter) 3 times in a row! Additionally, he was crowned 'Best Developer of the Year 2025' at Singsys Pvt Ltd for technical excellence.";
    }
    if (text.includes("shopify") || text.includes("liquid")) {
      return "Yes! Devansh has solid experience building custom Shopify themes from scratch using Liquid templates, HTML, CSS, and JS. He maintains Shopify features at Singsys.";
    }
    if (
      text.includes("hire") ||
      text.includes("available") ||
      text.includes("job") ||
      text.includes("contact") ||
      text.includes("email") ||
      text.includes("phone")
    ) {
      return "Devansh is actively seeking full-time Frontend Developer positions! You can contact him directly at mishradevansh2233@gmail.com or call him at +91 8957292605. He is located in Lucknow, UP, India, and open to remote/relocation roles.";
    }
    if (
      text.includes("project") ||
      text.includes("portfolio") ||
      text.includes("current")
    ) {
      return "His notable projects include a Custom Shopify Theme (Liquid), a Full-Stack MERN E-commerce platform (React, Node, Express, Stripe, MongoDB), and Atesplore (a WordPress site). Right now, he is building a real-time Chat App using MERN and Socket.io.";
    }
    if (
      text.includes("experience") ||
      text.includes("work") ||
      text.includes("singsys")
    ) {
      return "Devansh has 1+ years of professional experience. Since Nov 2024, he works as a Frontend Developer at Singsys Pvt Ltd, developing React/Redux apps and Shopify themes. Previously, he interned at Magnet Tech in mid-2023.";
    }

    return "That's an interesting question! I recommend scheduling a quick chat with Devansh. You can reach him at mishradevansh2233@gmail.com, or leave your details in the contact form below and he will get back to you ASAP!";
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Add User Message
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setChatInput("");
    setIsTyping(true);

    // Simulate Network delay for socket connection response
    setTimeout(() => {
      setIsTyping(false);
      const response = getBotResponse(text);
      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    }, 1200);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setIsSubmitting(true);
    setErrorMsg("");

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.warn(
        "Web3Forms access key not found in .env. Falling back to demo submission.",
      );
      setTimeout(() => {
        setIsSubmitting(false);
        setFormSubmitted(true);
        triggerDoubleConfetti();
        // Reset form
        setFormName("");
        setFormEmail("");
        setFormMessage("");
      }, 1000);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formName,
          email: formEmail,
          message: formMessage,
          subject: `Portfolio Contact from ${formName}`,
          from_name: "Devansh Mishra Portfolio",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setIsSubmitting(false);
        setFormSubmitted(true);
        triggerDoubleConfetti();
        setFormName("");
        setFormEmail("");
        setFormMessage("");
      } else {
        setIsSubmitting(false);
        setErrorMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);
      setErrorMsg(
        "Failed to connect to the server. Please check your connection.",
      );
    }
  };

  // Preset quick replies for the chat simulator
  const quickReplies = [
    "What are your key tech skills?",
    "Tell me about your awards.",
    "Tell me about your experience.",
    "What projects have you built?",
    "Are you available for hiring?",
  ];

  // Skills Listing with custom brand-colored SVGs
  const skills = [
    {
      name: "React.js",
      category: "frontend",
      level: "Expert",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="#61dafb"
          strokeWidth="2"
          fill="none"
        >
          <circle cx="12" cy="12" r="2"></circle>
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4"
            transform="rotate(30 12 12)"
          ></ellipse>
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4"
            transform="rotate(90 12 12)"
          ></ellipse>
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4"
            transform="rotate(150 12 12)"
          ></ellipse>
        </svg>
      ),
    },
    {
      name: "JavaScript",
      category: "languages",
      level: "Advanced",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#f7df1e">
          <rect width="24" height="24" rx="4"></rect>
          <text
            x="12"
            y="17"
            fontStyle="normal"
            fontWeight="bold"
            fontFamily="sans-serif"
            fontSize="10"
            fill="#000000"
            textAnchor="middle"
          >
            JS
          </text>
        </svg>
      ),
    },
    {
      name: "Redux",
      category: "frontend",
      level: "Intermediate",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="#764abc"
          strokeWidth="2"
          fill="none"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      ),
    },
    {
      name: "HTML5",
      category: "languages",
      level: "Expert",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#e34f26">
          <path d="M2 3h20l-1.8 17.5-8.2 2.5-8.2-2.5zm10 14.5l4-1.2.5-5.3H9.4l-.2-2h7.6l.2-2H7l.6 6.5h6.3l-.3 3.3-3.6 1.1-3.6-1.1-.2-2.2H5.1l.3 4.4z"></path>
        </svg>
      ),
    },
    {
      name: "CSS3",
      category: "languages",
      level: "Expert",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#1572b6">
          <path d="M2 3h20l-1.8 17.5-8.2 2.5-8.2-2.5zm10 14.5l4-1.2.5-5.3H7.6l.6 6.5zm-5-10.8h10l-.2 2H8l.2 2h6.4l-.4 4.3-3.2 1-3.2-1-.2-2.3H5.1l.3 4.4 6.6 2 6.6-2 .7-7.5H7.2z"></path>
        </svg>
      ),
    },
    {
      name: "Tailwind CSS",
      category: "frameworks",
      level: "Advanced",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#06b6d4">
          <path
            d="M12 6.09a6.83 6.83 0 0 0-4.74 2c-1.83 1.83-1.83 4.79 0 6.63A6.83 6.83 0 0 0 12 16.74c1.83-1.83 1.83-4.79 0-6.62a6.83 6.83 0 0 0-4.74-2c-1.83 1.83-1.83 4.79 0 6.63A6.83 6.83 0 0 0 12 12.09c1.83-1.83 1.83-4.79 0-6.62a6.83 6.83 0 0 0-4.74-2c-1.83 1.83-1.83 4.79 0 6.63z"
            opacity="0.8"
          ></path>
          <path d="M18.74 9.36a6.83 6.83 0 0 0-4.74 2c-1.83 1.83-1.83 4.79 0 6.63a6.83 6.83 0 0 0 4.74 2c1.83-1.83 1.83-4.79 0-6.63a6.83 6.83 0 0 0-4.74-2c-1.83 1.83-1.83 4.79 0 6.63a6.83 6.83 0 0 0 4.74-2c1.83-1.83 1.83-4.79 0-6.63z"></path>
        </svg>
      ),
    },
    {
      name: "Liquid (Shopify)",
      category: "others",
      level: "Advanced",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#96bf48">
          <path d="M19 6.5h-3v-1a4 4 0 0 0-8 0v1H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-11a2 2 0 0 0-2-2zm-9-1a2 2 0 0 1 4 0v1h-4zm9 13H5v-9h14z"></path>
        </svg>
      ),
    },
    {
      name: "WordPress",
      category: "others",
      level: "Expert",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#21759b">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm7.76 5.86c.24.49.36.98.36 1.48 0 1.22-.64 2.22-.64 2.22s-.41.74-.75 1.47l-2.02 5.56c.86-.54 1.58-1.27 2.1-2.14 1.13-1.88 1.18-5.32.95-8.59zm-8.89 11.23L7 9.9c0-.07.03-.13.08-.13h1.86c.3 0 .43.23.47.43l1.19 3.86 1.43-4.13c-.05-.07-.11-.16-.16-.16h-1c-.13 0-.3-.13-.3-.3s.17-.37.33-.37h3.33c.17 0 .33.17.33.37s-.17.3-.3.3h-.76l1.3 3.93L16.27 9.9c.07-.23.2-.43.5-.43h1.76c.07 0 .1.07.1.1l-3.9 10.46c-1.1-2.9-2.2-5.87-2.9-7.8l-1 2.84zm-3-11.83c.7 0 1.13.77 1.13 1.55 0 .61-.34 1.15-.61 1.76l-1.35 3.52c-.65-1.92-1.32-3.88-1.95-5.83.67-.77 1.72-1 2.78-1zM3.82 9.69c.57 2.36 1.42 4.69 2.05 7.02l-2.14-6c-.2-.47-.23-.88-.23-1.25 0 .07.14.16.32.23z"></path>
        </svg>
      ),
    },
    {
      name: "Bootstrap",
      category: "frameworks",
      level: "Advanced",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#7952b3">
          <rect width="24" height="24" rx="4"></rect>
          <text
            x="12"
            y="17"
            fontStyle="normal"
            fontWeight="bold"
            fontFamily="sans-serif"
            fontSize="16"
            fill="#ffffff"
            textAnchor="middle"
          >
            B
          </text>
        </svg>
      ),
    },
    {
      name: "Sass",
      category: "frameworks",
      level: "Intermediate",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#cc6699">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.12 11.53c-.34 1.25-1.42 1.83-2.61 1.83-1.56 0-2.58-1.02-2.58-2.65 0-1.73 1.12-2.78 2.68-2.78 1.16 0 2.14.61 2.45 1.56l-1.12.31c-.17-.51-.61-.92-1.29-.92-.85 0-1.53.58-1.53 1.77 0 1.05.58 1.67 1.46 1.67.75 0 1.26-.34 1.43-.99l1.12.3zm-7.65-2.07c.34-.68 1.05-.99 1.87-.99s1.53.31 1.87.99l-1.09.48c-.17-.34-.48-.54-.82-.54s-.65.2-.82.54l-1.01-.48zm.27 2.62c-.17.34-.48.54-.85.54s-.68-.2-.85-.54l-1.02.48c.34.68 1.05.99 1.87.99s1.53-.31 1.87-.99l-1.02-.48z"></path>
        </svg>
      ),
    },
    {
      name: "Git & GitHub",
      category: "others",
      level: "Advanced",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="#f1502f"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="18" cy="18" r="3"></circle>
          <circle cx="6" cy="6" r="3"></circle>
          <circle cx="6" cy="18" r="3"></circle>
          <path d="M18 15V9a4 4 0 0 0-4-4H9"></path>
          <path d="M6 9v6"></path>
        </svg>
      ),
    },
    {
      name: "Responsive Design",
      category: "frontend",
      level: "Expert",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="var(--secondary)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
          <rect
            x="18"
            y="10"
            width="4"
            height="7"
            rx="1"
            ry="1"
            fill="var(--bg-dark)"
          ></rect>
        </svg>
      ),
    },
    {
      name: "Performance Optimization",
      category: "frontend",
      level: "Advanced",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="var(--accent)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
          <path d="M12 12l4-4"></path>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      ),
    },
    {
      name: "REST APIs",
      category: "frontend",
      level: "Advanced",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="var(--primary)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7"></path>
          <path d="M19 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z"></path>
        </svg>
      ),
    },
  ];

  const filteredSkills =
    skillTab === "all"
      ? skills
      : skills.filter((skill) => skill.category === skillTab);

  // Projects Listing
  const projects = [
    {
      title: "MERN Real-Time Chat App",
      description:
        "A fully functional instant messaging app incorporating MERN stack and Socket.io for bi-directional communication. Features active status indicators, custom chat rooms, and responsive UX.",
      tags: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
      category: "react",
      github: "https://github.com/DevanshMishra22",
      live: null,
    },
    {
      title: "Custom Shopify Theme",
      description:
        "Developed a completely custom e-commerce Shopify theme from scratch. Styled mobile-first layouts, integrated Liquid logic, and optimized performance metrics for maximum loading speed.",
      tags: ["Shopify Theme", "Liquid", "HTML5", "CSS3", "JavaScript"],
      category: "shopify",
      github: "https://github.com/DevanshMishra22/Shopify-theme",
      live: null,
    },
    {
      title: "MERN E-commerce Platform",
      description:
        "A comprehensive online store app. Integrated Secure Stripe payment gateway gateway checkout, product inventory control, user authentication, and order shipment tracking.",
      tags: ["React.js", "Node.js", "Express", "MongoDB", "Stripe API"],
      category: "react",
      github: "https://github.com/DevanshMishra22/EcommerceApp",
      live: null,
    },
    {
      title: "Atesplore Marketing Hub",
      description:
        "Designed and built a responsive, high-converting marketing landing page for the food delivery application Atesplore to drive user acquisition and optimize click-through conversion rates.",
      tags: ["WordPress", "Elementor", "SEO Optimization", "Responsive Design"],
      category: "wordpress",
      github: null,
      live: "https://atesplore.com/",
    },
  ];

  const filteredProjects =
    projectFilter === "all"
      ? projects
      : projects.filter((proj) => proj.category === projectFilter);

  return (
    <>
      <div className="glow-mesh"></div>

      {/* Navigation */}
      <nav className={`glass-nav ${scrolled ? "scrolled" : ""}`}>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "64px",
            position: "relative",
          }}
        >
          <a href="#hero" className="navbar-brand">
            <span className="gradient-text">Devansh.dev</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="nav-links">
            <a
              href="#hero"
              className={`nav-link ${activeSection === "hero" ? "active" : ""}`}
            >
              Home
            </a>
            <a
              href="#experience"
              className={`nav-link ${activeSection === "experience" ? "active" : ""}`}
            >
              Experience
            </a>
            <a
              href="#skills"
              className={`nav-link ${activeSection === "skills" ? "active" : ""}`}
            >
              Skills
            </a>
            <a
              href="#projects"
              className={`nav-link ${activeSection === "projects" ? "active" : ""}`}
            >
              Projects
            </a>
            <a
              href="#chat"
              className={`nav-link ${activeSection === "chat" ? "active" : ""}`}
            >
              Chat Bot
            </a>
            <a
              href="#contact"
              className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
            >
              Contact
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a
              href="#contact"
              className="btn btn-secondary nav-cta"
              style={{ padding: "8px 16px", fontSize: "0.85rem" }}
            >
              Hire Me
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          <div className={`mobile-nav-links ${mobileMenuOpen ? "open" : ""}`}>
            <a
              href="#hero"
              className={`nav-link ${activeSection === "hero" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#experience"
              className={`nav-link ${activeSection === "experience" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Experience
            </a>
            <a
              href="#skills"
              className={`nav-link ${activeSection === "skills" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Skills
            </a>
            <a
              href="#projects"
              className={`nav-link ${activeSection === "projects" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </a>
            <a
              href="#chat"
              className={`nav-link ${activeSection === "chat" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Chat Bot
            </a>
            <a
              href="#contact"
              className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: "120px",
          paddingBottom: "60px",
        }}
      >
        <div className="container" style={{ width: "100%" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "40px",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  background: "rgba(139, 92, 246, 0.1)",
                  border: "1px solid var(--primary-glow)",
                  marginBottom: "24px",
                }}
              >
                <Sparkles
                  size={16}
                  className="gradient-text"
                  style={{ color: "var(--primary)" }}
                />
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--text-light)",
                  }}
                >
                  Available for Frontend Opportunities
                </span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  lineHeight: 1.1,
                  marginBottom: "16px",
                  fontWeight: 800,
                }}
              >
                Hi, I'm <span className="gradient-text">Devansh Mishra</span>
              </h1>

              <h2
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  fontWeight: 600,
                  color: "var(--text-light)",
                  marginBottom: "24px",
                  minHeight: "45px",
                }}
              >
                I'm a{" "}
                <span
                  style={{
                    color: "var(--primary)",
                    borderRight: "2px solid var(--primary)",
                    paddingRight: "4px",
                  }}
                >
                  {typedText}
                </span>
              </h2>

              <p
                style={{
                  fontSize: "1.15rem",
                  maxWidth: "600px",
                  marginBottom: "32px",
                  color: "var(--text-main)",
                }}
              >
                Frontend Developer with 1+ years of experience building
                high-performance, responsive web applications. Winner of{" "}
                <strong>Best Developer of the Year 2025</strong>. Specializing
                in React.js, modern UI/UX design systems, and Shopify
                development.
              </p>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <a href="#projects" className="btn btn-primary">
                  View My Work <ArrowRight size={18} />
                </a>
                <a href="#contact" className="btn btn-secondary">
                  Contact Me
                </a>
              </div>

              {/* Social links */}
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  marginTop: "40px",
                  alignItems: "center",
                }}
              >
                <a
                  href="https://github.com/DevanshMishra22/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle"
                  aria-label="GitHub"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/devansh-mishra-ba1633266/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle"
                  aria-label="LinkedIn"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a
                  href="mailto:mishradevansh2233@gmail.com"
                  className="social-circle"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Achievements Section */}
      <section
        id="achievements"
        style={{
          padding: "60px 0",
          background: "rgba(139, 92, 246, 0.02)",
          borderBlock: "1px solid var(--border)",
        }}
      >
        <div className="container">
          <div className="section-title" style={{ marginBottom: "30px" }}>
            <span
              className="gradient-text"
              style={{
                fontSize: "0.9rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Proven Excellence
            </span>
            <h2 style={{ fontSize: "2rem", marginTop: "10px" }}>
              Key Awards & Metrics
            </h2>
            <p>Click on any achievement card to celebrate!</p>
          </div>

          <div className="stats-grid">
            <div
              className="glass-panel stat-card"
              onClick={triggerDoubleConfetti}
            >
              <div className="stat-shine"></div>
              <Award
                className="stat-icon animate-float"
                size={40}
                style={{ color: "#fbbf24" }}
              />
              <div
                className="stat-number gradient-text"
                style={{ fontSize: "2.2rem" }}
              >
                3x Row
              </div>
              <div
                className="stat-label"
                style={{ color: "var(--text-light)" }}
              >
                Singsys Star Performer
              </div>
              <p style={{ fontSize: "0.85rem", marginTop: "8px" }}>
                Performer of the Quarter (3 consecutive wins)
              </p>
            </div>

            <div
              className="glass-panel stat-card"
              onClick={triggerDoubleConfetti}
            >
              <div className="stat-shine"></div>
              <Award
                className="stat-icon animate-float"
                size={40}
                style={{ color: "#a855f7" }}
              />
              <div
                className="stat-number gradient-text"
                style={{ fontSize: "2.2rem" }}
              >
                2025
              </div>
              <div
                className="stat-label"
                style={{ color: "var(--text-light)" }}
              >
                Developer of the Year
              </div>
              <p style={{ fontSize: "0.85rem", marginTop: "8px" }}>
                Singsys annual top developer award
              </p>
            </div>

            <div className="glass-panel stat-card" onClick={triggerConfetti}>
              <div className="stat-shine"></div>
              <Laptop
                className="stat-icon"
                size={40}
                style={{ color: "var(--secondary)" }}
              />
              <div className="stat-number">15+</div>
              <div className="stat-label">WordPress Sites</div>
              <p style={{ fontSize: "0.85rem", marginTop: "8px" }}>
                Highly performant & responsive landing pages
              </p>
            </div>

            <div className="glass-panel stat-card" onClick={triggerConfetti}>
              <div className="stat-shine"></div>
              <Code
                className="stat-icon"
                size={40}
                style={{ color: "var(--accent)" }}
              />
              <div className="stat-number">10+</div>
              <div className="stat-label">React / JS Projects</div>
              <p style={{ fontSize: "0.85rem", marginTop: "8px" }}>
                Websites & SaaS applications delivered
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience">
        <div className="container">
          <div className="section-title">
            <span
              className="gradient-text"
              style={{
                fontSize: "0.9rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              My Journey
            </span>
            <h2>Work Experience</h2>
            <p>
              A timeline of my professional experience in frontend development
            </p>
          </div>

          <div className="timeline">
            {/* Singsys */}
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="glass-panel timeline-content">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        color: "var(--text-heading)",
                      }}
                    >
                      Frontend Developer
                    </h3>
                    <span style={{ color: "var(--primary)", fontWeight: 600 }}>
                      Singsys Pvt Ltd
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      background: "rgba(255,255,255,0.05)",
                      padding: "4px 12px",
                      borderRadius: "9999px",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    Nov 2024 – Present
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "0.95rem",
                    marginBottom: "16px",
                    color: "var(--text-main)",
                  }}
                >
                  Developing and maintaining production-level frontend web
                  platforms. Collaborating with cross-functional designer &
                  backend teams.
                </p>

                <ul
                  style={{
                    textAlign: "left",
                    fontSize: "0.9rem",
                    color: "var(--text-light)",
                    paddingLeft: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <li>
                    Built features using{" "}
                    <strong>React.js, Redux, JavaScript</strong>, and{" "}
                    <strong>Tailwind CSS</strong>.
                  </li>
                  <li>
                    Developed custom{" "}
                    <strong>Shopify themes using Liquid</strong> templates.
                  </li>
                  <li>
                    Awarded **Performer of the Quarter (Singsys Star)** 3 times
                    in a row.
                  </li>
                  <li>
                    Awarded **Best Developer of the Year 2025** for outstanding
                    client project deliveries.
                  </li>
                </ul>
              </div>
            </div>

            {/* Magnet Tech */}
            <div className="timeline-item">
              <div
                className="timeline-marker"
                style={{ borderColor: "var(--secondary)" }}
              ></div>
              <div className="glass-panel timeline-content">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        color: "var(--text-heading)",
                      }}
                    >
                      Frontend Developer Intern
                    </h3>
                    <span
                      style={{ color: "var(--secondary)", fontWeight: 600 }}
                    >
                      Magnet Tech Pvt Ltd
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      background: "rgba(255,255,255,0.05)",
                      padding: "4px 12px",
                      borderRadius: "9999px",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    Apr 2023 – Jul 2023
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "0.95rem",
                    marginBottom: "16px",
                    color: "var(--text-main)",
                  }}
                >
                  Assisted in constructing web components and integrating
                  backend services.
                </p>

                <ul
                  style={{
                    textAlign: "left",
                    fontSize: "0.9rem",
                    color: "var(--text-light)",
                    paddingLeft: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <li>
                    Created responsive UI modules using **React.js, HTML5, CSS3,
                    and JavaScript**.
                  </li>
                  <li>
                    Implemented seamless cross-device testing, debugging, and
                    styling compatibility.
                  </li>
                </ul>
              </div>
            </div>

            {/* Education */}
            <div className="timeline-item">
              <div
                className="timeline-marker"
                style={{ borderColor: "var(--accent)" }}
              ></div>
              <div className="glass-panel timeline-content">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        color: "var(--text-heading)",
                      }}
                    >
                      Bachelor of Computer Applications (B.C.A)
                    </h3>
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                      City College of Management
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      background: "rgba(255,255,255,0.05)",
                      padding: "4px 12px",
                      borderRadius: "9999px",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    Sep 2021 – Jun 2024
                  </span>
                </div>
                <p style={{ fontSize: "0.95rem", color: "var(--text-main)" }}>
                  Graduated with a strong academic foundation in software
                  principles, data structures, and object-oriented programming.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" style={{ background: "rgba(6, 182, 212, 0.01)" }}>
        <div className="container">
          <div className="section-title">
            <span
              className="gradient-text"
              style={{
                fontSize: "0.9rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Technical Arsenal
            </span>
            <h2>My Toolbox</h2>
            <p>
              Technologies I work with to design and engineer web experiences
            </p>
          </div>

          <div className="skills-tab-container">
            <div className="skills-tabs">
              {["all", "frontend", "languages", "frameworks", "others"].map(
                (tab) => (
                  <button
                    key={tab}
                    className={`skills-tab ${skillTab === tab ? "active" : ""}`}
                    onClick={() => setSkillTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ),
              )}
            </div>

            <div className="skills-grid">
              {filteredSkills.map((skill) => (
                <div key={skill.name} className="glass-panel skill-card">
                  <div className="skill-icon">{skill.icon}</div>
                  <span>{skill.name}</span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-main)",
                      background: "rgba(255,255,255,0.04)",
                      padding: "2px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="container">
          <div className="section-title">
            <span
              className="gradient-text"
              style={{
                fontSize: "0.9rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Portfolio Work
            </span>
            <h2>Featured Projects</h2>
            <p>Select case studies and tools I have engineered</p>
          </div>

          <div className="project-filters">
            {["all", "react", "shopify", "wordpress"].map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${projectFilter === filter ? "active" : ""}`}
                onClick={() => setProjectFilter(filter)}
              >
                {filter === "all"
                  ? "All Work"
                  : filter === "shopify"
                    ? "Shopify/Liquid"
                    : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {filteredProjects.map((proj) => (
              <div key={proj.title} className="glass-panel project-card">
                <div className="project-body">
                  <div className="project-tags">
                    {proj.tags.map((t) => (
                      <span key={t} className="project-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-desc">{proj.description}</p>

                  <div className="project-footer">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ marginRight: "4px" }}
                        >
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                          <path d="M9 18c-4.51 2-5-2-7-2"></path>
                        </svg>{" "}
                        GitHub Source
                      </a>
                    )}
                    {proj.live && (
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        style={{ color: "var(--secondary)" }}
                      >
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                    {!proj.live && !proj.github && (
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--text-main)",
                        }}
                      >
                        Proprietary Code
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Simulator Section */}
      <section id="chat" style={{ background: "rgba(139, 92, 246, 0.01)" }}>
        <div className="container">
          <div className="section-title">
            <span
              className="gradient-text"
              style={{
                fontSize: "0.9rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Interactive Showcase
            </span>
            <h2>Socket.io Chat Simulator</h2>
            <p>
              Test drive a real-time message simulator (a nod to the MERN chat
              app I am currently building!)
            </p>
          </div>

          <div className="glass-panel chat-container">
            <div className="chat-header">
              <div className="chat-user-info">
                <div className="status-dot"></div>
                <div>
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      color: "var(--text-heading)",
                    }}
                  >
                    Devansh Bot
                  </h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-main)" }}>
                    Ask me anything
                  </p>
                </div>
              </div>
              <MessageSquare size={20} style={{ color: "var(--primary)" }} />
            </div>

            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-bubble ${msg.sender === "bot" ? "bot" : "user"}`}
                >
                  {msg.text}
                </div>
              ))}

              {isTyping && (
                <div className="chat-typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="chat-quick-replies">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  className="quick-reply-btn"
                  onClick={() => handleSendMessage(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(chatInput);
              }}
              className="chat-input-area"
            >
              <input
                type="text"
                className="chat-input"
                placeholder="Ask about skills, experience, achievements..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={isTyping}
              />
              <button
                type="submit"
                className="chat-send-btn"
                disabled={isTyping}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <div className="section-title">
            <span
              className="gradient-text"
              style={{
                fontSize: "0.9rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Get In Touch
            </span>
            <h2>Let's Work Together</h2>
            <p>
              Interested in hiring me or discussing a web project? Send a
              message!
            </p>
          </div>

          <div className="contact-container">
            <div className="glass-panel" style={{ padding: "40px" }}>
              <div className="contact-grid">
                {/* Contact Information */}
                <div className="contact-info">
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "8px",
                      textAlign: "left",
                    }}
                  >
                    Contact Info
                  </h3>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      marginBottom: "24px",
                      color: "var(--text-main)",
                      textAlign: "left",
                    }}
                  >
                    Feel free to contact me directly using any of the channels
                    below.
                  </p>

                  <div className="contact-item">
                    <div className="contact-item-icon">
                      <Mail size={20} />
                    </div>
                    <div
                      className="contact-item-details"
                      style={{ textAlign: "left" }}
                    >
                      <h4>Email</h4>
                      <p>
                        <a
                          href="mailto:mishradevansh2233@gmail.com"
                          style={{ color: "var(--text-light)" }}
                        >
                          mishradevansh2233@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-item-icon">
                      <Phone size={20} />
                    </div>
                    <div
                      className="contact-item-details"
                      style={{ textAlign: "left" }}
                    >
                      <h4>Phone</h4>
                      <p>
                        <a
                          href="tel:8957292605"
                          style={{ color: "var(--text-light)" }}
                        >
                          +91 8957292605
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-item-icon">
                      <MapPin size={20} />
                    </div>
                    <div
                      className="contact-item-details"
                      style={{ textAlign: "left" }}
                    >
                      <h4>Location</h4>
                      <p style={{ color: "var(--text-light)" }}>
                        Lucknow, Uttar Pradesh, India
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  {formSubmitted ? (
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          width: "64px",
                          height: "64px",
                          borderRadius: "50%",
                          background: "rgba(16, 185, 129, 0.1)",
                          border: "2px solid #10b981",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#10b981",
                        }}
                      >
                        <Check size={32} />
                      </div>
                      <h3
                        style={{
                          fontSize: "1.5rem",
                          color: "var(--text-heading)",
                        }}
                      >
                        Message Sent!
                      </h3>
                      <p
                        style={{
                          color: "var(--text-main)",
                          fontSize: "0.95rem",
                          textAlign: "center",
                        }}
                      >
                        Thank you for reaching out. I'll get back to you
                        shortly!
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleContactSubmit}
                      className="contact-form"
                    >
                      <div className="form-group" style={{ textAlign: "left" }}>
                        <label className="form-label" htmlFor="name">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="form-input"
                          placeholder="Your Name"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group" style={{ textAlign: "left" }}>
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-input"
                          placeholder="your.email@example.com"
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group" style={{ textAlign: "left" }}>
                        <label className="form-label" htmlFor="message">
                          Message
                        </label>
                        <textarea
                          id="message"
                          className="form-input"
                          placeholder="Leave a message..."
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          required
                        ></textarea>
                      </div>

                      {errorMsg && (
                        <div
                          style={{
                            color: "#ef4444",
                            fontSize: "0.9rem",
                            textAlign: "left",
                            background: "rgba(239, 68, 68, 0.1)",
                            border: "1px solid rgba(239, 68, 68, 0.2)",
                            padding: "10px 14px",
                            borderRadius: "6px",
                          }}
                        >
                          {errorMsg}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ justifyContent: "center" }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}{" "}
                        <Send size={18} />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-socials">
            <a
              href="https://github.com/DevanshMishra22/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-circle"
              aria-label="GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/devansh-mishra-ba1633266/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-circle"
              aria-label="LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a
              href="mailto:mishradevansh2233@gmail.com"
              className="social-circle"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
          <p style={{ fontSize: "0.9rem", color: "var(--text-main)" }}>
            © {new Date().getFullYear()} Devansh Mishra. All rights reserved.
          </p>
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--text-main)",
              marginTop: "8px",
            }}
          >
            Built with React & custom HSL Glassmorphism styling.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
