import PlayerInformationForm from "@/components/molecules/RegisterForms/PlayerInformationForm";
import ContactForm from "@/components/molecules/RegisterForms/ContactForm";
import SoccerBackground from "@/components/molecules/RegisterForms/SoccerBackground";
import GoalsForPrivateSessions from "@/components/molecules/RegisterForms/GoalsForPrivateSessions";
import Availability from "@/components/molecules/RegisterForms/Availability";
import AdditionalInformation from "@/components/molecules/RegisterForms/ AdditionalInformation";
import Acknowledgment from "@/components/molecules/RegisterForms/Acknowledgment";

// types
import { StepType } from "./types";


export const steps: StepType[] = [
    {
      number: 1,
      title: "Step 1",
      subtitle: "Player Information",
      isLast: false,
      component: <PlayerInformationForm />,
    },
    { 
      number: 2, 
      title: "Step 2", 
      subtitle: "Contact Details", 
      isLast: false,
      component: <ContactForm />
    },
    {
      number: 3,
      title: "Step 3",
      subtitle: "Soccer Background",
      isLast: false,
      component:<SoccerBackground />
    },
    {
      number: 4,
      title: "Step 4",
      subtitle: "Goals for Private Sessions",
      isLast: false,
      component: <GoalsForPrivateSessions />
    },
    { 
      number: 5, 
      title: "Step 5", 
      subtitle: "Availability", 
      isLast: false,
      component: <Availability />
    },
    {
      number: 6,
      title: "Step 6",
      subtitle: "Additional Information",
      isLast: false,
      component: <AdditionalInformation />
    },
    { 
      number: 7, 
      title: "Last step", 
      subtitle: "Acknowledgment", 
      isLast: true,
      component:<Acknowledgment />
    },
  ];