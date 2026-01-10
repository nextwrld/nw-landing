'use client';
import { useTranslation } from 'react-i18next';
import { CogIcon, SparklesIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import Image from "next/image";
import Link from "next/link";

const About = () => {
  const { t } = useTranslation('common');

  const services = [
    {
      icon: <CogIcon className="h-12 w-12" />,
      name: t('services.service1.name'),
      description: t('services.service1.description'),
    },
    {
      icon: <SparklesIcon className="h-12 w-12" />,
      name: t('services.service2.name'),
      description: t('services.service2.description'),
    },
    {
      icon: <ArrowPathIcon className="h-12 w-12" />,
      name: t('services.service3.name'),
      description: t('services.service3.description'),
    },
  ];

  return (
    <>
      {/* Services Section */}
      <section
        id="services"
        className="bg-gray-1 pb-8 pt-20 dark:bg-dark-2 lg:pb-[70px] lg:pt-[120px]"
      >
        <div className="container">
          {/* Header */}
          <div className="mb-[60px] text-center">
            <span className="mb-2 block text-lg font-semibold text-primary">
              {t('services.subtitle')}
            </span>
            <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[45px]">
              {t('services.title')}
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-stroke bg-white p-8 transition-all duration-300 hover:border-primary hover:shadow-xl dark:border-dark-3 dark:bg-dark-2 lg:p-10"
              >
                {/* Icon */}
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  {service.icon}
                </div>

                {/* Service Name */}
                <h3 className="mb-4 text-xl font-bold text-dark dark:text-white lg:text-2xl">
                  {service.name}
                </h3>

                {/* Service Description */}
                <p className="text-base leading-relaxed text-body-color dark:text-dark-6">
                  {service.description}
                </p>

                {/* Decorative Element */}
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 transition-all duration-300 group-hover:scale-150 group-hover:bg-primary/10"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="bg-white pb-8 pt-20 dark:bg-dark lg:pb-[70px] lg:pt-[120px]"
      >
        <div className="container">
          <div className="wow fadeInUp" data-wow-delay=".2s">
            <div className="-mx-4 flex flex-wrap items-center">
              <div className="w-full px-4 lg:w-1/2">
                <div className="mb-12 max-w-[540px] lg:mb-0">
                  <h2 className="mb-5 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-[40px] sm:leading-[1.2]">
                    {t('about.title')}
                  </h2>
                  <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
                    {t('about.description')}
                  </p>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-3 text-center text-base font-medium text-white duration-300 hover:bg-primary/90"
                  >
                    {t('about.studyCases')}
                  </Link>
                </div>
              </div>

              <div className="w-full px-4 lg:w-1/2">
                <div className="-mx-2 flex flex-wrap sm:-mx-4 lg:-mx-2 xl:-mx-4">
                  <div className="w-full px-2 sm:w-1/2 sm:px-4 lg:px-2 xl:px-4">
                    <div
                      className={`relative mb-4 sm:mb-8 sm:h-[400px] md:h-[540px] lg:h-[400px] xl:h-[500px] `}
                    >
                      <Image
                        src="/images/about/about-image-01.jpg"
                        alt="about image"
                        fill
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>

                  <div className="w-full px-2 sm:w-1/2 sm:px-4 lg:px-2 xl:px-4">
                    <div className="relative mb-4 sm:mb-8 sm:h-[220px] md:h-[346px] lg:mb-4 lg:h-[225px] xl:mb-8 xl:h-[310px]">
                      <Image
                        src="/images/about/about-image-02.jpg"
                        alt="about image"
                        fill
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="relative z-10 mb-4 flex items-center justify-center overflow-hidden bg-primary px-6 py-12 sm:mb-8 sm:h-[160px] sm:p-5 lg:mb-4 xl:mb-8">
                      <div>
                        <span className="block text-5xl font-extrabold text-white">
                          09
                        </span>
                        <span className="block text-base font-semibold text-white">
                          We have
                        </span>
                        <span className="block text-base font-medium text-white/70">
                          Years of experience
                        </span>
                      </div>
                      <div>
                        <span className="absolute left-0 top-0 -z-10">
                          <svg
                            width="106"
                            height="144"
                            viewBox="0 0 106 144"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              opacity="0.1"
                              x="-67"
                              y="47.127"
                              width="113.378"
                              height="131.304"
                              transform="rotate(-42.8643 -67 47.127)"
                              fill="url(#paint0_linear_1416_214)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_1416_214"
                                x1="-10.3111"
                                y1="47.127"
                                x2="-10.3111"
                                y2="178.431"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="white" />
                                <stop
                                  offset="1"
                                  stopColor="white"
                                  stopOpacity="0"
                                />
                              </linearGradient>
                            </defs>
                          </svg>
                        </span>
                        <span className="absolute right-0 top-0 -z-10">
                          <svg
                            width="130"
                            height="97"
                            viewBox="0 0 130 97"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              opacity="0.1"
                              x="0.86792"
                              y="-6.67725"
                              width="155.563"
                              height="140.614"
                              transform="rotate(-42.8643 0.86792 -6.67725)"
                              fill="url(#paint0_linear_1416_215)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_1416_215"
                                x1="78.6495"
                                y1="-6.67725"
                                x2="78.6495"
                                y2="133.937"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="white" />
                                <stop
                                  offset="1"
                                  stopColor="white"
                                  stopOpacity="0"
                                />
                              </linearGradient>
                            </defs>
                          </svg>
                        </span>
                        <span className="absolute bottom-0 right-0 -z-10">
                          <svg
                            width="175"
                            height="104"
                            viewBox="0 0 175 104"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              opacity="0.1"
                              x="175.011"
                              y="108.611"
                              width="101.246"
                              height="148.179"
                              transform="rotate(137.136 175.011 108.611)"
                              fill="url(#paint0_linear_1416_216)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_1416_216"
                                x1="225.634"
                                y1="108.611"
                                x2="225.634"
                                y2="256.79"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="white" />
                                <stop
                                  offset="1"
                                  stopColor="white"
                                  stopOpacity="0"
                                />
                              </linearGradient>
                            </defs>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
