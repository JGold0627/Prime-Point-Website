document.addEventListener("DOMContentLoaded", async () => {
  if (!window.ppSupabase) {
    console.error("Prime Point Supabase client was not found.");
    window.location.replace("login.html");
    return;
  }

  try {
    const {
      data: { session },
      error
    } = await window.ppSupabase.auth.getSession();

    if (error) {
      throw error;
    }

    // No authenticated Supabase session = no member portal access.
    if (!session?.user) {
      window.location.replace("login.html");
      return;
    }

    const user = session.user;

    // Make the authenticated user available even if the profile lookup fails.
    window.ppCurrentUser = user;

    let profile = null;

    try {
      const { data: profileData, error: profileError } =
        await window.ppSupabase
          .from("profiles")
          .select("id, first_name, last_name, phone, created_at, updated_at")
          .eq("id", user.id)
          .single();

      if (profileError) {
        throw profileError;
      }

      profile = profileData;
      window.ppCurrentProfile = profile;

      document
        .querySelectorAll("[data-member-profile-status]")
        .forEach((element) => {
          element.textContent = "Profile connected";
        });
    } catch (profileError) {
      console.error("Prime Point member profile lookup failed:", profileError);
      window.ppCurrentProfile = null;

      document
        .querySelectorAll("[data-member-profile-status]")
        .forEach((element) => {
          element.textContent = "Connection unavailable";
        });
    }

    const profileFirstName = profile?.first_name?.trim();
    const profileLastName = profile?.last_name?.trim();
    const metadataFirstName = user.user_metadata?.first_name?.trim();
    const metadataLastName = user.user_metadata?.last_name?.trim();

    const firstName = profileFirstName || metadataFirstName || "Member";
    const lastName = profileLastName || metadataLastName || "";
    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const phone = profile?.phone?.trim() || "";

    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`
      .toUpperCase()
      .trim();

    document.documentElement.dataset.authenticated = "true";

    // Update any member-name elements we add to the page/header.
    document
      .querySelectorAll("[data-member-first-name]")
      .forEach((element) => {
        element.textContent = firstName;
      });

    document
      .querySelectorAll("[data-member-last-name]")
      .forEach((element) => {
        element.textContent = lastName;
      });

    document
      .querySelectorAll("[data-member-full-name]")
      .forEach((element) => {
        element.textContent = fullName;
      });

    document
      .querySelectorAll("[data-member-phone]")
      .forEach((element) => {
        element.textContent = phone;
      });

    document
      .querySelectorAll("[data-member-initials]")
      .forEach((element) => {
        element.textContent = initials || firstName.charAt(0).toUpperCase();
      });

    document
      .querySelectorAll("[data-member-email]")
      .forEach((element) => {
        element.textContent = user.email || "";
      });

    // Connect logout buttons.
    document
      .querySelectorAll("[data-member-logout]")
      .forEach((button) => {
        button.addEventListener("click", async () => {
          button.disabled = true;

          try {
            const { error: signOutError } =
              await window.ppSupabase.auth.signOut();

            if (signOutError) {
              throw signOutError;
            }

            window.location.replace("login.html");
          } catch (signOutError) {
            console.error(
              "Prime Point logout error:",
              signOutError
            );

            button.disabled = false;
          }
        });
      });
  } catch (error) {
    console.error("Prime Point authentication check failed:", error);

    window.location.replace("login.html");
  }
});
