from fontbakery.checkrunner import Section, PASS, FAIL
from fontbakery.callable import check
from fontbakery.fonts_profile import profile_factory

profile_imports = ()
profile = profile_factory(default_section=Section("Test profile for Action CI"))

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


profile.check_skip_filter = check_skip_filter
profile.auto_register(globals())
profile.test_expected_checks(PROFILE_CHECKS, exclusive=True)
