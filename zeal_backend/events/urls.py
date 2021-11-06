from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

router.register(
    "organizer_ongoing_upcoming",
    OrganizerOngoingUpcomingEventView,
    basename="organizer_ongoing_upcoming",
)
router.register("organizer_past", OrganizerPastEventView, "organizer_past")

urlpatterns = router.urls
