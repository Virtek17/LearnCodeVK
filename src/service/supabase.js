import { createClient } from "@supabase/supabase-js";

const URL = "https://pzmngmvolauupwywudnf.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6bW5nbXZvbGF1dXB3eXd1ZG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5NDczMjIsImV4cCI6MjA2MDUyMzMyMn0.sLsQbHmlEyMERcT4X5ic7LMbnYvsjRUf73Pz6KMf26E";

const supabase = createClient(URL, API_KEY);
export default supabase;
