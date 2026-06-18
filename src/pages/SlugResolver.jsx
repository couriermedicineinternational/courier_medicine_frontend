import { useParams, Navigate } from "react-router-dom";
import { ALL_COUNTRIES, ALL_LOCATIONS } from "../constants";
import CountryDetail from "./CountryDetail";
import LocationDetail from "./LocationDetail";

export default function SlugResolver() {
  const { slug } = useParams();

  const isCountry = ALL_COUNTRIES.some(c => c.slug === slug);
  if (isCountry) return <CountryDetail />;

  const isLocation = ALL_LOCATIONS.some(l => l.slug === slug);
  if (isLocation) return <LocationDetail />;

  return <Navigate to="/" replace />;
}
