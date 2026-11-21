import { Masthead } from '@/components/Masthead';
import { SetupWizard } from '@/components/SetupWizard';
import { currentLang } from '@/lib/lang';

export default async function WizardPage() {
  const lang = await currentLang();
  return (
    <>
      <Masthead lang={lang} path="/wizard" compact />
      <SetupWizard initialLang={lang} />
    </>
  );
}
