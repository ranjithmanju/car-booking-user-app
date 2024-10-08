type Step = 'vehicle' | 'capacity' | 'details' | 'confirm';

export const getStepStyle = (currentStep: Step, step: Step) => {
  const order = ['vehicle', 'capacity', 'details', 'confirm'];
  const currentIndex = order.indexOf(currentStep);
  const stepIndex = order.indexOf(step);

  if (stepIndex <= currentIndex) {
    return {
      iconBg: 'bg-black',
      iconColor: 'text-white',
      lineBg: 'bg-black'
    };
  } else {
    return {
      iconBg: 'bg-[#f1fbf7]',
      iconColor: 'text-gray-400',
      lineBg: 'bg-[#f1fbf7]'
    };
  }
};
