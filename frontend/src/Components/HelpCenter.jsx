import { useState } from 'react';
import { Search, HelpCircle, Mail, ChevronDown, ChevronUp, Phone, ArrowUp, User, AlertTriangle, Play, ShoppingCart, Smartphone, Lock } from 'lucide-react';
import { useSelector } from 'react-redux';
// FAQ Data with Topics
const faqs = [
  { topic: "Getting Started", question: "How do I get started with the platform?", answer: "Sign up with your email, verify your account, and start exploring courses." },
  { topic: "Getting Started", question: "What are the system requirements?", answer: "A modern browser and stable internet connection are sufficient." },
  { topic: "Account/Profile", question: "How do I reset my password?", answer: "Go to the login page and click 'Forgot Password'." },
  { topic: "Account/Profile", question: "How do I update my profile information?", answer: "Go to 'Profile' and click 'Edit Profile'." },
  { topic: "Troubleshooting", question: "Why is the video not playing?", answer: "Check your internet connection and refresh the page." },
  { topic: "Troubleshooting", question: "How do I fix login issues?", answer: "Clear your browser cache or try a different browser." },
  { topic: "Learning Experience", question: "How can I access my courses?", answer: "Navigate to 'My Courses' from the dashboard after logging in." },
  { topic: "Learning Experience", question: "Can I download course materials?", answer: "Yes, most courses allow downloading materials for offline use." },
  { topic: "Purchase/Refunds", question: "How do I cancel my subscription?", answer: "Go to 'Account Settings' and select 'Cancel Subscription'." },
  { topic: "Purchase/Refunds", question: "What is the refund policy?", answer: "Refunds are available within 30 days of purchase." },
  { topic: "On the Go! Mobile", question: "How do I download the mobile app?", answer: "Visit the App Store or Google Play to download our app." },
  { topic: "On the Go! Mobile", question: "Can I access all features on mobile?", answer: "Yes, the mobile app supports all core features." },
  { topic: "Trust & Safety", question: "How is my data protected?", answer: "We use encryption and comply with data protection regulations." },
  { topic: "Trust & Safety", question: "How do I report an issue?", answer: "Use the 'Report a Problem' link in the footer." },
];

// SearchBar Component
const SearchBar = () => (
  <div className="flex items-center shadow-md rounded-md overflow-hidden">
    <input
      type="text"
      placeholder="Search for help..."
      className="w-full p-4 text-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button className="p-4 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
      <Search size={20} />
    </button>
  </div>
);

// TopicSelector Component (Styled to Match the Provided Image)
const TopicSelector = ({ selectedTopic, setSelectedTopic }) => {
  const topics = [
    { name: "Getting Started", icon: ArrowUp, description: "Learn how getting started and how to start learning." },
    { name: "Account/Profile", icon: User, description: "Manage your account settings." },
    { name: "Troubleshooting", icon: AlertTriangle, description: "Experiencing a technical issue? Check here." },
    { name: "Learning Experience", icon: Play, description: "Everything about the Udemy learning experience." },
    { name: "Purchase/Refunds", icon: ShoppingCart, description: "Learn about purchasing courses, how to send gifts, and refunds." },
    { name: "On the Go! Mobile", icon: Smartphone, description: "Learn about our mobile app." },
    { name: "Trust & Safety", icon: Lock, description: "Trust & Safety information and reporting." },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {topics.map((topic) => {
        const Icon = topic.icon;
        const isSelected = selectedTopic === topic.name;
        return (
          <button
            key={topic.name}
            onClick={() => setSelectedTopic(topic.name)}
            className={`p-6 border border-gray-300 rounded-lg text-left transition-all hover:shadow-lg ${
              isSelected ? "bg-blue-50 border-blue-500" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full mb-4">
              <Icon size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{topic.name}</h3>
            <p className="text-sm text-gray-600">{topic.description}</p>
          </button>
        );
      })}
    </div>
  );
};

// FAQAccordion Component (Updated to Receive State as Props)
const FAQAccordion = ({ faqs, openIndex, setOpenIndex }) => {
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-gray-800">{faq.question}</span>
            {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {openIndex === index && (
            <div className="p-4 bg-gray-50 text-gray-600 border-t border-gray-200">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ContactForm Component
const ContactForm = () => (
  <form className="space-y-6 bg-white p-6 rounded-lg shadow-md">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
      <input
        type="text"
        id="name"
        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
      />
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        id="email"
        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
      />
    </div>
    <div>
      <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
      <textarea
        id="message"
        rows="4"
        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
      ></textarea>
    </div>
    <button
      type="submit"
      className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md"
    >
      Submit
    </button>
  </form>
);

// Main HelpCenter Component (Updated to Manage FAQ State)
const HelpCenter = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [openIndex, setOpenIndex] = useState(null); // Moved state to parent component
  const filteredFaqs = selectedTopic ? faqs.filter(faq => faq.topic === selectedTopic) : faqs;
  const openSidebar = useSelector((state) => state.ui_store.openSidebar);
  const isCollapsed = useSelector((state) => state.ui_store.isCollapsed || false);
  const fullscreenSidebar = useSelector((state) => state.ui_store.fullscreenSidebar);
  console.log("fullscreenSidebar" , fullscreenSidebar);
  return (
    <div className={`mx-auto p-6 md:p-10 bg-gray-50 min-h-screen ${
      window.innerWidth <= 768 
        ? (fullscreenSidebar ? "hidden" : "ml-0")
        : (openSidebar ? "ml-60" : "ml-16")
    }`}>
      <h1 className="text-4xl font-bold text-gray-800 mb-6 ">Help Center</h1>
      <p className="text-lg text-gray-600 mb-10">Find answers to your questions or reach out for support.</p>

      <section className="mb-12">
        <SearchBar />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Select a Topic to Search for Help</h2>
        <TopicSelector selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <HelpCircle size={24} className="mr-2 text-blue-600" /> Frequently Asked Questions
        </h2>
        <FAQAccordion faqs={filteredFaqs} openIndex={openIndex} setOpenIndex={setOpenIndex} />
      </section>

      <section>
        <div className="flex items-center mb-6">
          <Phone size={28} className="mr-3 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-800">Contact Support</h2>
        </div>
        <p className="text-gray-600 mb-6">Can’t find what you need? Our support team is here to assist you.</p>
        <ContactForm />
      </section>
    </div>
  );
};

export default HelpCenter;