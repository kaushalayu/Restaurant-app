// src/components/RouteLoader.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function RouteLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // When route path changes → start loading
    setLoading(true);

    // Simulate page load delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // you can reduce or increase

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-blue-500 animate-pulse z-50">Loading...</div>
  );
}
