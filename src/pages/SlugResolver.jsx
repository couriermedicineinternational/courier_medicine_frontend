import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../utils/api";
import CountryDetail from "./CountryDetail";
import LocationDetail from "./LocationDetail";

export default function SlugResolver() {
  const { slug } = useParams();
  const [prevSlug, setPrevSlug] = useState(slug);
  const [resolvedType, setResolvedType] = useState(null); // 'country' or 'location'
  const [loading, setLoading] = useState(true);

  // If slug changes, reset state immediately during render to prevent stale child rendering
  if (slug !== prevSlug) {
    setPrevSlug(slug);
    setResolvedType(null);
    setLoading(true);
  }

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;
    api.get(`/countries/${slug}`)
      .then(res => {
        if (!isMounted) return;
        if (res.data && res.data.success && res.data.data) {
          setResolvedType('country');
        } else {
          setResolvedType('location');
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setResolvedType('location');
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (resolvedType === 'country') {
    return <CountryDetail />;
  }

  return <LocationDetail />;
}
