from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

router.register(
    "organizer_ongoing_upcoming",
    OrganizerOngoingUpcomingEventView,
    basename="organizer_ongoing_upcoming",
)
router.register("List", OrganizerParticipantsListView, "List")
router.register("join", ParticipantEventJoinView, "join")
router.register(
    "leave", ParticipantEventLeaveView, "leave"
)


urlpatterns = router.urls
