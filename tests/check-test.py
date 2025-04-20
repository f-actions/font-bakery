from fontbakery.profile import Profile, Section
from fontbakery.status import PASS, FAIL
from fontbakery.callable import check

# Define the PROFILE metadata directly
PROFILE = Profile(
    name="f-actions Test Profile",
    sections=[
        Section(
            "Test profile for Action CI",
            "A section containing checks for testing the f-actions/font-bakery GitHub Action.",
        )
    ],
    # You can add other profile metadata here if needed, like iterargs
)

# Define the default section for checks if not explicitly assigned
DEFAULT_SECTION = PROFILE.sections[0]

PROFILE_CHECKS = [
    "com.factions/tests/alwayspass",
]

excluded_check_ids = ()


@check(
    id="com.factions/tests/alwayspass",
    rationale="""
    A test check for CI testing of the f-actions/font-bakery GitHub
    Action
    """,
)
def com_factions_tests_alwayspass(ttFonts):
    """Fake test for testing purposes"""
    yield PASS, "This always passes so that checks themselves do not fail CI"


# ================================================
#
# End check definitions
#
# ================================================


# skip filter function to exclude checks defined in the
# fontbakery universal profile
def check_skip_filter(checkid, font=None, **iterargs):
    if font and checkid in excluded_check_ids:
        return False, ("Check skipped in this profile")
    return True, None


PROFILE.check_skip_filter = check_skip_filter
PROFILE.auto_register(globals())
PROFILE.test_expected_checks(PROFILE_CHECKS, exclusive=True)
