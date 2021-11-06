from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

router.register(
    "organizer_ongoing_upcoming",
    OrganizerOngoingUpcomingEventView,
    basename="organizer_ongoing_upcoming",
)
router.register("organizer_past", OrganizerPastEventView, "organizer_past")
# router.register('organizer_participant_list', OrganizerParticipantsListView, 'organizer_participant_list')
# router.register('organizer_list_teams', OrganizerTeamListView, 'organizer_list_teams')

router.register("participant_join", ParticipantEventJoinView, "participant_join")
# router.register('participant_leave_event', ParticipantEventLeaveView, 'participant_leave_event')
# router.register('participant_ongoing', ParticipantEventOngoingView, 'participant_ongoing')
# router.register('participant_past', ParticipantEventPastView, 'participant_past')
# router.register('participant_others_team', ParticipantEventTeamOthers, 'participant_others_team')
# router.register('participant_owner_team', ParticipantEventTeamOwner, 'participant_owner_team')
# router.register('participant_signup', ParticipantEventSignupView, 'participant_signup')
# router.register('add_remove_team_participant', AddRemoveTeamParticipant, 'add_remove_team_participant')
# router.register('participant_member_teams', ParticipantMemberTeams, 'participant_member_teams')
# router.register('participant_team_invites', ParticipantTeamInvites, 'participant_team_invites')

urlpatterns = router.urls
