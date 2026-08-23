document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-account-form]");

  if (!form || !window.ppSupabase) {
    console.error(
      "Prime Point account form or Supabase client was not found."
    );
    return;
  }

  const note = form.querySelector(".account-form-note");
  const submitButton = form.querySelector(".account-submit");
  const submitButtonText = submitButton?.querySelector("span");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const firstName = String(formData.get("first_name") || "").trim();
    const lastName = String(formData.get("last_name") || "").trim();
    const email = String(formData.get("email") || "")
      .trim()
      .toLowerCase();

    const password = String(formData.get("password") || "");
    const passwordConfirm = String(
      formData.get("password_confirm") || ""
    );

    // Make sure the two password fields match.
    if (password !== passwordConfirm) {
      showMessage("Your password fields do not match.", true);
      return;
    }

    // Prime Point currently requires a minimum of 8 characters.
    if (password.length < 8) {
      showMessage(
        "Your password must be at least 8 characters.",
        true
      );
      return;
    }

    // Terms must be accepted before account creation.
    const termsAccepted = formData.get("terms");

    if (!termsAccepted) {
      showMessage(
        "Please accept the Terms of Service and Privacy Policy.",
        true
      );
      return;
    }

    setLoading(true);
    showMessage("");

    try {
      const { data, error } = await window.ppSupabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            `${window.location.origin}/login.html?verified=1`,

          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });

      if (error) {
        throw error;
      }

      // Because email confirmation is enabled in Supabase,
      // a new user normally exists without an active session
      // until their email address is verified.
      if (data.user && !data.session) {
        form.reset();

        showMessage(
          "Account created. Check your email to verify your Prime Point Health account."
        );

        return;
      }

      // Fallback in case email confirmation is ever disabled.
      if (data.session) {
        window.location.href = "member-home.html";
      }
    } catch (error) {
      console.error("Prime Point signup error:", error);

      let message =
        "We couldn't create your account. Please try again.";

      if (error?.message) {
        const errorMessage = error.message.toLowerCase();

        if (
          errorMessage.includes("already") ||
          errorMessage.includes("registered")
        ) {
          message =
            "An account may already exist with this email address. Try logging in instead.";
        } else if (errorMessage.includes("password")) {
          message =
            "Your password does not meet the account security requirements.";
        } else if (errorMessage.includes("email")) {
          message =
            "Please enter a valid email address.";
        }
      }

      showMessage(message, true);
    } finally {
      setLoading(false);
    }
  });

  function setLoading(isLoading) {
    if (!submitButton) return;

    submitButton.disabled = isLoading;

    if (submitButtonText) {
      submitButtonText.textContent = isLoading
        ? "Creating account..."
        : "Create my account";
    }
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