// pages/HomePage.tsx
import { useEffect, useState } from "react";
import Sidebar from "@/components/Layout/Sidebar";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  InputAdornment,
  Skeleton,
  Fade,
  IconButton,
  Tooltip,
} from "@mui/material";
import SellIcon from "@mui/icons-material/Sell";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CategoryIcon from "@mui/icons-material/Category";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";

const categories = ["Any Category", "Business", "Education", "Party"];
const eventTypes = ["Any Event Type", "Seminar", "Networking", "Party"];
const ticketPrices = ["Any Ticket Price", "Free", "Paid"];

export default function HomePage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    keywords: "",
    location: "",
    date: "Any Date",
    category: "Any Category",
    eventType: "Any Event Type",
    ticketPrice: "Any Ticket Price",
  });

  const cardHoverStyles = {
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: '#FF4D4D',
      boxShadow: "0px 12px 24px rgba(255, 77, 77, 0.3)",
      transform: "translateY(-4px) scale(1.02)",
      color:'white',
      "& .MuiTypography-root": {
        color: "white",
      },
      "& .MuiChip-root": {
        backgroundColor: "rgba(255,255,255,0.9)",
        color: "#FF4D4D",
      },
    }
  }

  const handleSearch = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (searchFilters.keywords) queryParams.append('keywords', searchFilters.keywords);
      if (searchFilters.location) queryParams.append('location', searchFilters.location);
      if (searchFilters.date !== 'Any Date') queryParams.append('date', searchFilters.date);
      if (searchFilters.category !== 'Any Category') queryParams.append('category', searchFilters.category);
      if (searchFilters.eventType !== 'Any Event Type') queryParams.append('eventType', searchFilters.eventType);
      if (searchFilters.ticketPrice !== 'Any Ticket Price') queryParams.append('ticketPrice', searchFilters.ticketPrice);

      const res = await fetch(`http://localhost:3001/events/fetchEvents?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Search failed");
      const json = await res.json();
      setEvents(json.data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearAllFilters = () => {
    setSearchFilters({
      keywords: "",
      location: "",
      date: "Any Date",
      category: "Any Category",
      eventType: "Any Event Type",
      ticketPrice: "Any Ticket Price",
    });
  };

  const hasActiveFilters = () => {
    return searchFilters.keywords || 
           searchFilters.location || 
           searchFilters.date !== "Any Date" ||
           searchFilters.category !== "Any Category" ||
           searchFilters.eventType !== "Any Event Type" ||
           searchFilters.ticketPrice !== "Any Ticket Price";
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3001/events/fetchEvents");
        if (!res.ok) throw new Error("Fetch failed");
        const json = await res.json();
        console.log("Fetched data:", json);
        setEvents(json.data);
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderSkeleton = () => (
    <Box>
      {[1, 2, 3].map((item) => (
        <Card key={item} sx={{ mb: 2, p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="30%" height={20} />
              <Skeleton variant="text" width="60%" height={28} sx={{ mt: 1 }} />
              <Skeleton variant="text" width="40%" height={20} sx={{ mt: 1 }} />
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Skeleton variant="rounded" width={100} height={32} />
              <Skeleton variant="rounded" width={80} height={32} />
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <Sidebar />

      <Box sx={{ flex: 1, p: 0, ml: "245px" }}>
        {/* Header */}
        <Box sx={{ 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          p: 4,
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
            Discover Amazing Events
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 300 }}>
            Find the perfect event for your interests
          </Typography>
          <Box sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
          }} />
        </Box>

        {/* Search Controls */}
        <Box sx={{ p: 3, backgroundColor: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#374151" }}>
              <FilterListIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              Search Filters
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {hasActiveFilters() && (
                <Tooltip title="Clear all filters">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={clearAllFilters}
                    startIcon={<ClearIcon />}
                    sx={{ 
                      borderColor: "#e5e7eb", 
                      color: "#6b7280",
                      "&:hover": { borderColor: "#FF4D4D", color: "#FF4D4D" }
                    }}
                  >
                    Clear All
                  </Button>
                </Tooltip>
              )}
              <Tooltip title={showFilters ? "Hide filters" : "Show filters"}>
                <IconButton 
                  onClick={() => setShowFilters(!showFilters)}
                  size="small"
                  sx={{ 
                    color: "#6b7280",
                    "&:hover": { color: "#FF4D4D", backgroundColor: "#fee2e2" }
                  }}
                >
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Fade in={showFilters}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 2,
                mb: 3,
              }}
            >
              <TextField
                label="Event Name"
                placeholder="Search events..."
                value={searchFilters.keywords}
                onChange={(e) => setSearchFilters({...searchFilters, keywords: e.target.value})}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EventIcon sx={{ color: "#9ca3af" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": { borderColor: "#FF4D4D" },
                    "&.Mui-focused fieldset": { borderColor: "#FF4D4D" },
                  },
                }}
              />

              <TextField
                label="Location"
                placeholder="Enter city or venue..."
                value={searchFilters.location}
                onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon sx={{ color: "#9ca3af" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": { borderColor: "#FF4D4D" },
                    "&.Mui-focused fieldset": { borderColor: "#FF4D4D" },
                  },
                }}
              />

              <TextField
                label="Event Date"
                select
                value={searchFilters.date}
                onChange={(e) => setSearchFilters({...searchFilters, date: e.target.value})}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon sx={{ color: "#9ca3af" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": { borderColor: "#FF4D4D" },
                    "&.Mui-focused fieldset": { borderColor: "#FF4D4D" },
                  },
                }}
              >
                {["Any Date", "Today", "This Week", "This Month"].map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>

              <TextField
                label="Category"
                select
                value={searchFilters.category}
                onChange={(e) => setSearchFilters({...searchFilters, category: e.target.value})}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CategoryIcon sx={{ color: "#9ca3af" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": { borderColor: "#FF4D4D" },
                    "&.Mui-focused fieldset": { borderColor: "#FF4D4D" },
                  },
                }}
              >
                {categories.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>

              <TextField
                label="Event Type"
                select
                value={searchFilters.eventType}
                onChange={(e) => setSearchFilters({...searchFilters, eventType: e.target.value})}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalActivityIcon sx={{ color: "#9ca3af" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": { borderColor: "#FF4D4D" },
                    "&.Mui-focused fieldset": { borderColor: "#FF4D4D" },
                  },
                }}
              >
                {eventTypes.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>

              <TextField
                label="Ticket Price"
                select
                value={searchFilters.ticketPrice}
                onChange={(e) => setSearchFilters({...searchFilters, ticketPrice: e.target.value})}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SellIcon sx={{ color: "#9ca3af" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": { borderColor: "#FF4D4D" },
                    "&.Mui-focused fieldset": { borderColor: "#FF4D4D" },
                  },
                }}
              >
                {ticketPrices.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
            </Box>
          </Fade>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              disabled={loading}
              size="large"
              sx={{
                background: "linear-gradient(135deg, #FF4D4D 0%, #e63946 100%)",
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(255, 77, 77, 0.4)",
                "&:hover": {
                  background: "linear-gradient(135deg, #e63946 0%, #dc2626 100%)",
                  boxShadow: "0 6px 20px rgba(255, 77, 77, 0.6)",
                  transform: "translateY(-2px)",
                },
                "&:disabled": {
                  opacity: 0.7,
                },
              }}
            >
              {loading ? "Searching..." : "Search Events"}
            </Button>
          </Box>
        </Box>

        {/* Results Section */}
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 700, 
              color: "#1f2937",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Featured Events
            </Typography>
            <Chip 
              label={`${events.length} events found`} 
              sx={{ 
                backgroundColor: "#e0f2fe", 
                color: "#0277bd",
                fontWeight: 600 
              }} 
            />
          </Box>

          {loading ? renderSkeleton() : (
            <Box sx={{ display: "grid", gap: 2 }}>
              {events.length > 0 ? (
                events.map((event, index) => (
                  <Fade in={true} timeout={300 + index * 100} key={index}>
                    <Card
                      sx={{
                        borderRadius: 3,
                        border: "1px solid #e5e7eb",
                        backgroundColor: "white",
                        overflow: "hidden",
                        ...cardHoverStyles
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                              <CalendarTodayIcon sx={{ fontSize: 16, color: "#6b7280" }} />
                              <Typography variant="caption" sx={{ 
                                fontWeight: 600, 
                                color: "#6b7280",
                                textTransform: "uppercase",
                                letterSpacing: 0.5
                              }}>
                                {event.eventDate}
                              </Typography>
                            </Box>
                            <Typography variant="h6" sx={{ 
                              fontWeight: 700, 
                              mb: 1,
                              color: "#1f2937",
                              fontSize: "1.25rem"
                            }}>
                              {event.title}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <LocationOnIcon sx={{ fontSize: 16, color: "#ef4444" }} />
                              <Typography variant="body2" sx={{ color: "#6b7280" }}>
                                {event.eventVenue}
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#9ca3af", mx: 1 }}>•</Typography>
                              <Typography variant="body2" sx={{ color: "#6b7280" }}>
                                {event.type}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "flex-end" }}>
                            <Chip
                              icon={<SellIcon />}
                              label={`${event.availableTickets} Tickets`}
                              color="success"
                              variant="filled"
                              sx={{ 
                                fontWeight: 600,
                                borderRadius: 2,
                                "& .MuiChip-icon": { fontSize: 16 }
                              }}
                            />
                            <Chip
                              label={event.price ? `₹${event.price}` : "FREE"}
                              color="primary"
                              variant="filled"
                              sx={{ 
                                fontWeight: 600,
                                borderRadius: 2,
                                backgroundColor: event.price ? "#3b82f6" : "#10b981"
                              }}
                            />
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Fade>
                ))
              ) : (
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <EventIcon sx={{ fontSize: 64, color: "#d1d5db", mb: 2 }} />
                  <Typography variant="h6" sx={{ color: "#6b7280", mb: 1 }}>
                    No events found
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                    Try adjusting your search filters or check back later for new events.
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}