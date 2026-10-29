import enum
from datetime import datetime

from sqlalchemy import BigInteger, String, Enum as SqlEnum, TIMESTAMP, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class UserRole(str, enum.Enum):
    candidate = "candidate"
    hr_manager = "hr_manager"
    manager = "manager"
    admin = "admin"


class UserStatus(str, enum.Enum):
    active = "active"
    blocked = "blocked"


class User(Base):
    """Базовая учётная запись любого участника системы."""

    __tablename__ = "users"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False, unique=True, index=True)
    phone: Mapped[str] = mapped_column(String(20), nullable=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(SqlEnum(UserRole, name="user_role"), nullable=False, index=True)
    status: Mapped[UserStatus] = mapped_column(
        SqlEnum(UserStatus, name="user_status"), nullable=False, default=UserStatus.active
    )
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), server_default=func.now())

    candidate: Mapped["Candidate"] = relationship(
        back_populates="user", uselist=False, cascade="all, delete-orphan"
    )
    hr_manager: Mapped["HRManager"] = relationship(
        back_populates="user", uselist=False, cascade="all, delete-orphan"
    )


class Candidate(Base):
    """Расширение пользователя для роли 'candidate'."""

    __tablename__ = "candidates"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[int] = mapped_column(
        BigInteger, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True
    )

    user: Mapped["User"] = relationship(back_populates="candidate")


class HRManager(Base):
    """Расширение пользователя для роли 'hr_manager'."""

    __tablename__ = "hr_managers"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[int] = mapped_column(
        BigInteger, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True
    )

    user: Mapped["User"] = relationship(back_populates="hr_manager")
