from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

router.register("create", OrganizerOngoingUpcomingEventView,basename="create")
router.register("list", OrganizerParticipantsListView, "list")
router.register("join", ParticipantEventJoinView, "join")
router.register("leave", ParticipantEventLeaveView, "leave")


urlpatterns = router.urls
