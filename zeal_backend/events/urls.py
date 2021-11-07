from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

router.register(
    "organizer_ongoing_upcoming",
    OrganizerOngoingUpcomingEventView,
    basename="organizer_ongoing_upcoming",
)
router.register("organizer_past", OrganizerPastEventView, "organizer_past")
router.register("participant_join", ParticipantEventJoinView, "participant_join")
router.register('participant_leave_event', ParticipantEventLeaveView, 'participant_leave_event')


urlpatterns = router.urls
