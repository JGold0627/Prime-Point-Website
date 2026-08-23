document.addEventListener("DOMContentLoaded", async () => {
  const form = document.querySelector("[data-login-form]");

  if (!form || !window.ppSupabase) {
    console.error("Prime Point login form or Supabase client was not found.");
    return;
  }

  const note = form.querySelector(".login-form-note");
  const submitButton = form.querySelector(".login-submit");

  // Show a confirmation message after email verification.
  const params = new URLSearchParams(window.location.search);

  if (params.get("verified") === "1") {
    showMessage("Your email has been verified successfully.");
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const email = String(formData.get("email") || "")
      .trim()
      .toLowerCase();

    const password = String(formData.get("password") || "");

    if (!email || !password) {
      showMessage("Please enter your email address and password.", true);
      return;
    }

    setLoading(true);
    showMessage("");

    try {
      const { data, error } =
        await window.ppSupabase.auth.signInWithPassword({
          email,
          password
        });

      if (error) {
        throw error;
      }

      if (!data.session) {
        throw new Error("No active session was created.");
      }

      showMessage("Login successful. Opening your secure member home...");

      window.location.href = "member-home.html";
    } catch (error) {
      console.error("Prime Point login error:", error);

      let message =
        "We couldn't log you in. Please check your email and password.";

      const errorMessage = String(error?.message || "").toLowerCase();

      if (
        errorMessage.includes("invalid login credentials") ||
        errorMessage.includes("invalid credentials")
      ) {
        message = "The email address or password you entered is incorrect.";
      } else if (
        errorMessage.includes("email not confirmed") ||
        errorMessage.includes("not confirmed")
      ) {
        message =
          "Please verify your email address before logging in.";
      } else if (errorMessage.includes("rate")) {
        message =
          "Too many login attempts. Please wait a moment and try again.";
      }

      showMessage(message, true);
    } finally {
      setLoading(false);
    }
  });

  function setLoading(isLoading) {
    if (!submitButton) return;

    submitButton.disabled = isLoading;
    submitButton.textContent = isLoading ? "Logging in..." : "Log in";
  }

  function showMessage(message, isError = false) {
    if (!note) return;

    note.textContent = message;

    if (!message) {
      note.removeAttribute("data-status");
      return;
    }

    note.setAttribute(
      "data-status",
      isError ? "error" : "success"
    );
  }
});