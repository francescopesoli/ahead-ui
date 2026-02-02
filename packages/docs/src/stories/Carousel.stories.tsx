import type { Meta, StoryObj } from '@storybook/react';
import { Carousel, CarouselSlides, CarouselSlide, CarouselPrevious, CarouselNext, CarouselDots } from '@ahead-ui/components';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Display/Carousel',
  component: Carousel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: () => (
    <Carousel className="w-96">
      <CarouselSlides>
        <CarouselSlide>
          <div className="h-48 bg-primary flex items-center justify-center text-primary-fg rounded-lg">
            Slide 1
          </div>
        </CarouselSlide>
        <CarouselSlide>
          <div className="h-48 bg-success flex items-center justify-center text-success-fg rounded-lg">
            Slide 2
          </div>
        </CarouselSlide>
        <CarouselSlide>
          <div className="h-48 bg-warning flex items-center justify-center text-warning-fg rounded-lg">
            Slide 3
          </div>
        </CarouselSlide>
      </CarouselSlides>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const WithDots: Story = {
  render: () => (
    <Carousel className="w-96">
      <CarouselSlides>
        <CarouselSlide>
          <div className="h-48 bg-gradient-to-r from-primary to-accent flex items-center justify-center text-primary-fg rounded-lg">
            First Slide
          </div>
        </CarouselSlide>
        <CarouselSlide>
          <div className="h-48 bg-gradient-to-r from-success to-primary flex items-center justify-center text-success-fg rounded-lg">
            Second Slide
          </div>
        </CarouselSlide>
        <CarouselSlide>
          <div className="h-48 bg-gradient-to-r from-warning to-danger flex items-center justify-center text-warning-fg rounded-lg">
            Third Slide
          </div>
        </CarouselSlide>
      </CarouselSlides>
      <CarouselDots className="mt-4" />
    </Carousel>
  ),
};

export const AutoPlay: Story = {
  render: () => (
    <Carousel className="w-96" autoPlay interval={3000}>
      <CarouselSlides>
        {[1, 2, 3, 4].map((i) => (
          <CarouselSlide key={i}>
            <div className="h-48 bg-bg-subtle flex items-center justify-center rounded-lg border">
              <span className="text-3xl font-bold text-fg-muted">{i}</span>
            </div>
          </CarouselSlide>
        ))}
      </CarouselSlides>
      <CarouselDots className="mt-4" />
    </Carousel>
  ),
};

export const ImageCarousel: Story = {
  render: () => (
    <Carousel className="w-[32rem]">
      <CarouselSlides>
        <CarouselSlide>
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
            alt="Mountains"
            className="w-full h-64 object-cover rounded-lg"
          />
        </CarouselSlide>
        <CarouselSlide>
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop"
            alt="Beach"
            className="w-full h-64 object-cover rounded-lg"
          />
        </CarouselSlide>
        <CarouselSlide>
          <img
            src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=400&fit=crop"
            alt="Forest"
            className="w-full h-64 object-cover rounded-lg"
          />
        </CarouselSlide>
      </CarouselSlides>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots className="mt-4" />
    </Carousel>
  ),
};

export const CardCarousel: Story = {
  render: () => (
    <Carousel className="w-80">
      <CarouselSlides>
        {[
          { title: 'Card 1', desc: 'Description for card 1' },
          { title: 'Card 2', desc: 'Description for card 2' },
          { title: 'Card 3', desc: 'Description for card 3' },
        ].map((card, i) => (
          <CarouselSlide key={i}>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-fg-muted">{card.desc}</p>
            </div>
          </CarouselSlide>
        ))}
      </CarouselSlides>
      <div className="flex items-center justify-between mt-4">
        <CarouselDots />
        <div className="flex gap-2">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </div>
    </Carousel>
  ),
};

export const Testimonials: Story = {
  render: () => (
    <Carousel className="w-96">
      <CarouselSlides>
        {[
          { quote: 'Amazing product! Highly recommended.', author: 'John D.' },
          { quote: 'Best design system I have ever used.', author: 'Jane S.' },
          { quote: 'Saved us months of development time.', author: 'Bob W.' },
        ].map((testimonial, i) => (
          <CarouselSlide key={i}>
            <div className="p-6 text-center">
              <svg
                className="w-8 h-8 text-fg-muted mx-auto mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-lg mb-4">{testimonial.quote}</p>
              <p className="text-sm text-fg-muted">— {testimonial.author}</p>
            </div>
          </CarouselSlide>
        ))}
      </CarouselSlides>
      <CarouselDots className="mt-4" />
    </Carousel>
  ),
};

export const MultipleSlides: Story = {
  render: () => (
    <Carousel className="w-[40rem]" slidesPerView={3} gap={16}>
      <CarouselSlides>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <CarouselSlide key={i}>
            <div className="h-32 bg-bg-subtle flex items-center justify-center rounded-lg border">
              <span className="text-2xl font-bold text-fg-muted">{i}</span>
            </div>
          </CarouselSlide>
        ))}
      </CarouselSlides>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const VerticalCarousel: Story = {
  render: () => (
    <Carousel className="h-64 w-80" orientation="vertical">
      <CarouselSlides>
        {[1, 2, 3].map((i) => (
          <CarouselSlide key={i}>
            <div className="h-full bg-bg-subtle flex items-center justify-center rounded-lg border">
              <span className="text-2xl font-bold text-fg-muted">Slide {i}</span>
            </div>
          </CarouselSlide>
        ))}
      </CarouselSlides>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const Loop: Story = {
  render: () => (
    <Carousel className="w-96" loop>
      <CarouselSlides>
        {['A', 'B', 'C'].map((letter) => (
          <CarouselSlide key={letter}>
            <div className="h-48 bg-primary flex items-center justify-center text-primary-fg rounded-lg">
              <span className="text-4xl font-bold">{letter}</span>
            </div>
          </CarouselSlide>
        ))}
      </CarouselSlides>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots className="mt-4" />
    </Carousel>
  ),
};
