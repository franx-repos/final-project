const styles = {
  container: "flex flex-col justify-center bg-slate-100/50 dark:bg-gray-900",
  content: "my-16 p-5 flex flex-col items-center gap-16",
  header: "flex flex-col gap-2 text-center",
  title:
    "mb-2 text-3xl font-extrabold leading-tight text-dark-grey-900 lg:text-4xl dark:text-white",
  subtitle:
    "text-base font-medium leading-7 text-dark-grey-600 dark:text-white",
  stepsWrapper:
    "flex w-full flex-col items-center justify-between gap-y-10 lg:flex-row lg:gap-x-8 lg:gap-y-0 xl:gap-x-10",
  stepContainer: "flex flex-col items-start gap-4",
  stepIcon:
    "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white dark:bg-transparent dark:border-2 dark:border-teal-500",
  stepIconNumber:
    "text-base font-bold leading-7 text-dark-grey-600 dark:text-white",
  stepTextContainer: "flex flex-col",
  stepTitle:
    "mb-2 text-base font-bold leading-tight text-dark-grey-900 dark:text-white",
  stepDescription:
    "text-base font-medium leading-7 text-dark-grey-600 dark:text-white",
  arrowContainer: "rotate-90 lg:rotate-0",
};

const steps = [
  {
    num: "1",
    title: "Create your Account",
    desc: "Condimentum vit pellemsque habitant morbi at molestie.",
    img: "/src/assets/user-icon.svg",
  },
  {
    num: "2",
    title: "Create a task",
    desc: "Condimentum vit pellemsque habitant morbi at molestie.",
    img: "/src/assets/task-icon.svg",
  },
  {
    num: "3",
    title: "Get connected with a Pro",
    desc: "Condimentum vit pellemsque habitant morbi at molestie.",
    img: "/src/assets/connect-icon.svg",
  },
];

const HowItWorks = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className="flex flex-col gap-16">
          <div className={styles.header}>
            <h2 className={styles.title}>How it works?</h2>
            <p className={styles.subtitle}>
              Tellus rutrum tellus pellentesque eu tincidunt tortor condimentum.
            </p>
          </div>
        </div>
        <div className={styles.stepsWrapper}>
          {steps.map((step, index) => {
            return (
              <div key={index}>
                <div className={styles.stepContainer}>
                  <img
                    className="w-36 h-36 m-auto"
                    src={step.img}
                    alt={step.title}
                  />

                  <div className={styles.stepIcon}>
                    <span className={styles.stepIconNumber}>{step.num}</span>
                  </div>
                  <div className={styles.stepTextContainer}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.desc}</p>
                  </div>
                </div>
                {step.num <= steps.length - 1 && (
                  <div className={styles.arrowContainer}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="43"
                      height="42"
                      viewBox="0 0 43 42"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_3346_6663)">
                        <path
                          d="M16.9242 11.7425C16.2417 12.425 16.2417 13.5275 16.9242 14.21L23.7142 21L16.9242 27.79C16.2417 28.4725 16.2417 29.575 16.9242 30.2575C17.6067 30.94 18.7092 30.94 19.3917 30.2575L27.4242 22.225C28.1067 21.5425 28.1067 20.44 27.4242 19.7575L19.3917 11.725C18.7267 11.06 17.6067 11.06 16.9242 11.7425Z"
                          fill="#14b8a6"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3346_6663">
                          <rect
                            width="42"
                            height="42"
                            fill="white"
                            transform="translate(0.666748)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
