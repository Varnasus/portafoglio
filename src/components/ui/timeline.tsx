"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface TimelineEvent {
  id: string
  date: string
  title: string
  company: string
  location: string
  description: string
  achievements: string[]
  metrics: Record<string, string>
  category: 'career' | 'education' | 'achievement' | 'project'
  icon?: string
  image?: string
  altText?: string
  isCurrent?: boolean
}

interface TimelineSlideshowProps {
  events: TimelineEvent[]
  className?: string
}

export function TimelineSlideshow({ events, className = "" }: TimelineSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const sortedEvents = events.sort((a, b) => {
    const yearA = parseInt(a.date.split(' ')[0])
    const yearB = parseInt(b.date.split(' ')[0])
    return yearB - yearA
  })

  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= sortedEvents.length || isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentSlide(index)
    
    // Reset transition state after animation
    setTimeout(() => setIsTransitioning(false), 300)
  }, [sortedEvents.length, isTransitioning])

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1)
  }, [currentSlide, goToSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          prevSlide()
          break
        case 'ArrowRight':
          event.preventDefault()
          nextSlide()
          break
        case 'Home':
          event.preventDefault()
          goToSlide(0)
          break
        case 'End':
          event.preventDefault()
          goToSlide(sortedEvents.length - 1)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevSlide, nextSlide, goToSlide, sortedEvents.length])

  const currentEvent = sortedEvents[currentSlide]
  const progressPercentage = ((currentSlide + 1) / sortedEvents.length) * 100

  return (
    <div className={`relative ${className}`}>
      {/* Main Timeline Section */}
      <div className="relative bg-black py-12 overflow-hidden">
        {/* Background Number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-[12rem] font-black text-gray-800 select-none">
            {currentEvent.date.split(' ')[0]}
          </div>
        </div>

        {/* Timeline Line */}
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            {/* Timeline Header */}
            <div className="flex justify-between items-center mb-10" data-timeline="header">
              <div className="text-left" data-timeline="header-left">
                <div className="text-sm font-medium text-gray-400 mb-2" data-timeline="header-label">Timeline</div>
                <h2 className="text-3xl font-bold text-white" data-timeline="header-title">Career Journey</h2>
              </div>
              <div className="text-right" data-timeline="header-right">
                <div className="text-xl font-bold text-white" data-timeline="slide-counter">
                  {currentSlide + 1} / {sortedEvents.length}
                </div>
              </div>
            </div>

            {/* Timeline Line */}
            <div className="relative h-1 bg-gray-700 mb-10" data-timeline="progress-line">
              <div 
                className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                style={{ width: `${progressPercentage}%` }}
                data-timeline="progress-fill"
              />
            </div>

            {/* Timeline Events */}
            <div className="flex justify-between items-center relative">
              {sortedEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`relative flex flex-col items-center transition-all duration-300 ${
                    index === currentSlide ? 'scale-110' : 'scale-90 opacity-60'
                  }`}
                >
                  {/* Date Tag */}
                  <div className="bg-gray-800 text-white px-3 py-1.5 rounded-lg mb-3 font-medium border border-gray-600 text-sm">
                    {event.date}
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-blue-500 border-white scale-125 shadow-[0_0_15px_rgba(59,130,246,0.8)]' 
                      : 'bg-gray-600 border-gray-400'
                  }`} />
                  
                  {/* Event Title */}
                  <div className="absolute top-16 text-center max-w-28 text-xs font-medium text-gray-300 leading-tight">
                    {event.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current Slide Content - Positioned below timeline dates */}
        <div className="relative z-10 max-w-4xl mx-auto px-8 mt-20" data-timeline="content-card-container">
          <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700 shadow-[0_0_30px_rgba(59,130,246,0.4)] min-h-[450px] flex flex-col" data-timeline="content-card">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start flex-1">
              {/* Text Content */}
              <div className="flex-1" data-timeline="text-content">
                <div className="flex items-center gap-3 mb-3" data-timeline="category-indicator">
                  <div className={`w-3 h-3 rounded-full ${
                    currentEvent.category === 'career' ? 'bg-blue-500' :
                    currentEvent.category === 'education' ? 'bg-green-500' :
                    currentEvent.category === 'achievement' ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`} data-timeline="category-dot" />
                  <span className="text-sm font-medium text-gray-400 capitalize" data-timeline="category-text">
                    {currentEvent.category}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3" data-timeline="event-title">
                  {currentEvent.title}
                </h3>
                
                <p className="text-base text-gray-300 mb-4" data-timeline="event-description">
                  {currentEvent.description}
                </p>
                
                <div className="space-y-3 flex-1" data-timeline="achievements-section">
                  <div>
                    <h4 className="font-semibold text-white mb-2" data-timeline="achievements-title">Key Achievements</h4>
                    <ul className="space-y-1.5" data-timeline="achievements-list">
                      {currentEvent.achievements.slice(0, 3).map((achievement, i) => (
                        <li key={i} className="text-gray-300 flex items-start text-sm" data-timeline={`achievement-item-${i}`}>
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" data-timeline={`achievement-bullet-${i}`}></span>
                          <span data-timeline={`achievement-text-${i}`}>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Image/Visual Content */}
              <div className="flex justify-center" data-timeline="image-container">
                {currentEvent.image ? (
                  <img 
                    src={currentEvent.image} 
                    alt={currentEvent.altText || currentEvent.title}
                    className="w-48 h-48 object-cover rounded-lg shadow-lg"
                    data-timeline="event-image"
                  />
                ) : (
                  <div className="w-48 h-48 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg flex items-center justify-center" data-timeline="event-icon-container">
                    <div className="text-5xl" data-timeline="event-icon">{currentEvent.icon || '🚀'}</div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Step Indicator - Integrated into the card */}
            <div className="mt-6 pt-6 border-t border-gray-700" data-timeline="step-indicator">
              <div className="flex flex-col items-center gap-4">
                {/* Center Navigation */}
                <div className="flex items-center gap-3" data-timeline="center-navigation">
                  <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="p-1.5 text-white hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous slide"
                    data-timeline="prev-button"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  {/* Progress Dots */}
                  <div className="flex gap-1.5" data-timeline="progress-dots">
                    {sortedEvents.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                          index === currentSlide 
                            ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' 
                            : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                        data-timeline={`progress-dot-${index}`}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={nextSlide}
                    disabled={currentSlide === sortedEvents.length - 1}
                    className="p-1.5 text-white hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next slide"
                    data-timeline="next-button"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
