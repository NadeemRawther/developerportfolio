"use client";

import React, { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Center } from "@react-three/drei";
import { BillionStars } from "../../models/billionStars";
import HomeModel from "../components/HomeIcon3D";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const experiences = [
  {
    date: "Jan 2017 - Oct 2018",
    title: "Software Developer",
    description:
      "Self Employed Kollam, Kerala, India \n" +
      "* Develop android application using java and android SDK \n" +
      "* Use FireBase as Back-end service \n" +
      "* Design Websites using html, css , javascript , php\n" +
      "Skills: Firebase , PHP , Android application Development,HTML , CSS ,WEB DEVELOPMENT, XML  ,  Android Development , Android , Java ,SQLite"
  },
  {
    date: "Nov 2018 - Aug 2019 ",
    title: "Software Developer",
    description:
      "Bestowal Infotechs · Full-time \n " +
      "Trivandrum, Kerala, India \n" +
      "* Build Android Application using Java, and Back-end service using FireBase,\n" +
      "* Revamped the existing android application for the candidates and added new feature to it,\n" +
      "* ssessed the UX and UI designs for technical feasibility,\n" +
      "* Trained Teams on Java and Android mobile application development,\n" +
      "* Trained students for Academic projects in android application development,\n" +
      "* Trained Students on C# , Java and PHP, HTML,CSS ,JAVASCRIPT for Web Development,\n" +
      "Skills : HTML , Cascading Style Sheets (CSS) , Firebase , Web Design , PHP , Android, C# , JavaScript , Java , Web Development , Android application Development,SQLite,Firebase, XML",
  },
  {
    date: "Sep 2019 - Jun 2021",
    title: "Senior Software Developer",
    description:
      "Self Employed · Full-time Kollam, Kerala, India \n" +
      "• Develop Android application in MVVM design pattern and uses Jetpack libraries and KOTLIN language .\n" +
      "• Revamped the existing android application for the candidate and added new features to it.\n" +
      "• Designing UI for android applications and Websites.\n" +
      "• Used Kotlin Coroutines.\n" +
      "• Build Desktop Application for Billing Software Using Kivy a Python framework.\n" +
      "• Build Websites using WORDPRESS.\n" +
      "* Build Websites using HTML, CSS.\n" +
      "Skills: Python kivy , HTML , Cascading Style Sheets (CSS) , Model-view-viewmodel (MVVM) , Kotlin Coroutines , WordPress , Java  , Android application Development, Amazon Web Services (AWS) , XML  , Android Jetpack  , Android Development , Kotlin Coroutines , CodeIgniter, GitHub , REST,SQLite,Android jetpack libraries,Hilt Dependency injection ,ROOM database,Navigation,Paging3,Retrofit",
  },
  {
    date: "Jul 2021 - Oct 2021",
    title: "Senior Android Developer",
    description:
      " Whytecreations Agency · Full-time WFH" +
      "•Develop Android application with MVVM  design pattern clean architecture and uses Jetpack libraries and KOTLIN language.\n" +
      "• Finding errors and performance issues in android applications.\n" +
      "• Fixing the bugs.\n" +
      "• Collaborated with teams in designing, developing and deploying the application.\n" +
      "• Develop apps using  other jetpack libraries like pagination,navigation etc.\n" +
      "Skills: Amazon Web Services (AWS) , XML , Model-view-viewmodel (MVVM) , Android Jetpack ,  Android Development , Kotlin Coroutines , Android , Java , Kotlin , CodeIgniter, GitHub , REST ,Retrofit, SQLite , jetpack libraries,Hilt Dependency injection ,ROOM database,Navigation,Paging3",
  },
  {
    date: "Nov 2021 - April 2023",
    title: "Senior Software Developer Self-employed.",
    description:
      " Full-time Kollam, Kerala,India" +
      "•Develop Android applications with  MVVM design pattern and uses Jetpack libraries and KOTLIN language.\n" +
      "• Designing UI for android applications and Websites .\n" +
      "• Follows TDD (Test Driven Development).\n" +
      "• Fixing the bugs .\n" +
      "• Improving performance of applications using modern tools.\n" +
      "• Develop Backend using CodeIgniter.\n" +
      "• Develop websites using WORDPRESS.\n" +
      "• Used Amazon AWS for Backend Services.\n" +
      "Skills: Amazon Web Services (AWS) ,XML,Model-view-viewmodel (MVVM) ,Android Jetpack ,Test Driven Development ,Android Development ,Kotlin Coroutines ,Android ,Java ,Kotlin ,CodeIgniter,GitHub ,REST,JUnit ,Clean Architecture,SQLite,jetpack libraries,Hilt Dependency injection ,ROOM database,Navigation,Paging3,Retrofit,\n JetPack Compose,Kotlin lint,Flutter,Reactjs,Django",
  },
  {
    date: "April 2023 - Present",
    title: "Android Developer, UniAthena (Schneide IT)",
    description:
      "Full-time (EdTech), WFH\n" +
      "• Design, develop, and maintain Kotlin-based applications and features for Android platforms, ensuring code quality, performance, and maintainability.\n" +
      "• Collaborate with product managers, UI/UX designers, and other business teams to gather requirements, create user stories, and establish project timelines.\n" +
      "• Analyse, troubleshoot, and resolve application defects while implementing optimal solutions to address identified issues.\n" +
      "• Ensure application compatibility across different Android devices and OS versions by testing and debugging software.\n" +
      "• Implement best practices for coding, testing, and documentation to ensure high-quality, secured, and maintainable code.\n" +
      "• Keep up-to-date with the latest industry trends and technologies to ensure the software stays relevant and competitive.\n" +
      "• Participate in Agile/Scrum development processes, including daily stand-ups, sprint planning, and retrospectives.\n" +
      "• Provide technical support and guidance to stakeholders, such as business teams and customer support teams, as needed.\n" +
      "• Continuously learn and improve skill set to contribute to team growth and stay up-to-date with Kotlin and Android development best practices.\n" +
      "Skills: XML, Model-view-viewmodel (MVVM), Android Jetpack, Test Driven Development, Android Development, Flutter, Kotlin Coroutines, Android, Java, Kotlin, GitHub, REST, JUnit, Clean Architecture, SQLite, Jetpack libraries, Hilt Dependency Injection, ROOM database, Navigation, Paging3, Retrofit, JetPack Compose, Kotlin lint, Jira, React JS",
  },
];

export default function ExperiencePage() {
  return (
    <div className="w-screen h-screen relative">
      {/* 3D Background Canvas */}
      <Canvas
        style={{ position: "fixed", top: 0, left: 0, zIndex: 0 }}
        camera={{ position: [0, 10, 30], fov: 50 }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Suspense fallback={<Html>Loading 3D Scene...</Html>}>
          <HomeModel position={[-22, 9, 0]} />
          <BillionStars position={[0, 0, 0]} scale={50} />
        </Suspense>
        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>
      {/* Foreground Timeline */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          height: "100%",
          overflowY: "auto",
          background: "rgba(0, 0, 0, 0.4)",
          padding: "20px",
          pointerEvents: "none",
        }}
      >

        <div className="text-center text-[34px]"><h1><b>Experience</b> </h1></div>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            marginTop: "10px",
            pointerEvents: "auto",
          }}
        >
          <VerticalTimeline style={{ margin: "0" }}>
            {experiences.map((experience, index) => (
              <VerticalTimelineElement
                key={index}
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "rgb(33, 150, 243)",
                  color: "#fff",
                  boxShadow: "0 3px 10px rgba(0, 0, 0, 0.5)",
                  opacity: 1,
                  visibility: "visible",
                  padding: "15px",
                  transform: index % 2 === 0 ? "translateX(-20px)" : "translateX(20px)",
                }}
                contentArrowStyle={{ borderRight: "7px solid rgb(33, 150, 243)" }}
                date={experience.date}
                dateClassName="text-white opacity-100"
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                style={{ visibility: "visible" }}
              >
                <h3
                  className="vertical-timeline-element-title"
                  style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                >
                  {experience.title}
                </h3>
                <p
                  style={{ fontSize: "1rem", margin: 0 }}
                  dangerouslySetInnerHTML={{ __html: experience.description.replace(/\n/g, "<br />") }}
                />
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </div>
  );
}