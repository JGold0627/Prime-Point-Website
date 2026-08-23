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

    // Pull basic member information from Supabase Auth metadata.
    const firstName =
      user.user_metadata?.first_name?.trim() || "Member";

    const lastName =
      user.user_metadata?.last_name?.trim() || "";

    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`
      .toUpperCase()
      .trim();

    // Make member information available to the rest of the site.
    window.ppCurrentUser = user;

    document.documentElement.dataset.authenticated = "true";

    // Update any member-name elements we add to the page/header.
    document
      .querySelectorAll("[data-member-first-name]")
      .forEach((element) => {
        element.textContent = firstName;
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