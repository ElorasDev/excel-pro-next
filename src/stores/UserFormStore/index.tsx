import { create } from 'zustand';
import { Gender, SkillLevel, PlayerPosition, AvailableDays, PreferredTime } from './enums/enums';


interface UserFormState {
  fullname: string;
  age: number | null;
  gender: Gender;
  parent_name: string;
  phone_number: string;
  email: string;
  current_skill_level: SkillLevel;
  player_positions?: PlayerPosition;
  custom_position?: string;
  session_goals: string;
  available_days: AvailableDays;
  preferred_time: PreferredTime;
  medical_conditions: string;
  comments: string;
  liability_waiver: boolean;
  cancellation_policy: boolean;
  stripeCustomerId?: string;

  setFullname: (fullname: string) => void;
  setAge: (age: number | null) => void;
  setGender: (gender: Gender) => void;
  setParentName: (parentName: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setEmail: (email: string) => void;
  setSkillLevel: (skillLevel: SkillLevel) => void;
  setPlayerPosition: (position: PlayerPosition) => void;
  setCustomPosition: (customPosition: string) => void;
  setSessionGoals: (sessionGoals: string) => void;
  setAvailableDays: (availableDays: AvailableDays) => void;
  setPreferredTime: (preferredTime: PreferredTime) => void;
  setMedicalConditions: (medicalConditions: string) => void;
  setComments: (comments: string) => void;
  setLiabilityWaiver: (liabilityWaiver: boolean) => void;
  setCancellationPolicy: (cancellationPolicy: boolean) => void;
  setStripeCustomerId: (stripeCustomerId: string) => void;
}

const useUserFormStore = create<UserFormState>((set) => ({
  fullname: '',
  age: null,
  gender: Gender.PREFER_NOT_TO_SAY,
  parent_name: '',
  phone_number: '',
  email: '',
  current_skill_level: SkillLevel.BEGINNER,
  player_positions: undefined,
  custom_position: '',
  session_goals: '',
  available_days: AvailableDays.MONDAY,
  preferred_time: PreferredTime.MORNING,
  medical_conditions: '',
  comments: '',
  liability_waiver: false,
  cancellation_policy: false,
  stripeCustomerId: '',

  setFullname: (fullname) => set({ fullname }),
  setAge: (age) => set({ age }),
  setGender: (gender) => set({ gender }),
  setParentName: (parentName) => set({ parent_name: parentName }),
  setPhoneNumber: (phoneNumber) => set({ phone_number: phoneNumber }),
  setEmail: (email) => set({ email }),
  setSkillLevel: (skillLevel) => set({ current_skill_level: skillLevel }),
  setPlayerPosition: (position) => set({ player_positions: position }),
  setCustomPosition: (customPosition) => set({ custom_position: customPosition }),
  setSessionGoals: (sessionGoals) => set({ session_goals: sessionGoals }),
  setAvailableDays: (availableDays) => set({ available_days: availableDays }),
  setPreferredTime: (preferredTime) => set({ preferred_time: preferredTime }),
  setMedicalConditions: (medicalConditions) => set({ medical_conditions: medicalConditions }),
  setComments: (comments) => set({ comments }),
  setLiabilityWaiver: (liabilityWaiver) => set({ liability_waiver: liabilityWaiver }),
  setCancellationPolicy: (cancellationPolicy) => set({ cancellation_policy: cancellationPolicy }),
  setStripeCustomerId: (stripeCustomerId) => set({ stripeCustomerId }),
}));

export default useUserFormStore;