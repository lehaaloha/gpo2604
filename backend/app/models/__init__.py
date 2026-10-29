# Здесь собираются ВСЕ модели проекта — этот файл нужен,
# чтобы Alembic видел все таблицы через Base.metadata при автогенерации.
# По мере добавления новых доменов дописывайте сюда импорт.

from .user import User, Candidate, HRManager, UserRole, UserStatus
from .vacancy import Vacancy
from .application import Application
from .ai_assessment import AiAssessment
from .testing import Survey, QuestionBank, Question, TestingSession, Answer

# from .roadmap import Roadmap, RoadmapItem, Technology
# from .notification import Notification
