// src/components/ProjectList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './homepage.css';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/projects'); // Adjust the URL if needed
                setProjects(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        // JavaScript to filter birds
        const filterBirds = () => {
            let selectedBirdTypeRadio = document.querySelector("input[type=radio][name=type]:checked");
            let selectedBirdType = selectedBirdTypeRadio ? selectedBirdTypeRadio.value.toLowerCase() : "all";
            let checkboxes = document.querySelectorAll("input[type=checkbox][name=size]");
            let checkedSizes = Array.from(checkboxes).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
            let birds = document.querySelectorAll('[data-item="bird"]');

            for (let i = 0; i < birds.length; i++) {
                let birdType = birds[i].getAttribute("data-bird-type");
                let birdSize = birds[i].getAttribute("data-bird-size");

                if (
                    (checkedSizes.includes(birdSize) || checkedSizes.length === 0) &&
                    (birdType === selectedBirdType || selectedBirdType === "all")
                ) {
                    birds[i].style.display = "";
                } else {
                    birds[i].style.display = "none";
                }
            }
        };

        document.addEventListener("DOMContentLoaded", (event) => {
            let radios = document.querySelectorAll("input[type=radio][name=type]");
            radios.forEach((radio) => radio.addEventListener("change", filterBirds));
            let checkboxes = document.querySelectorAll("input[type=checkbox][name=size]");
            checkboxes.forEach((checkbox) => checkbox.addEventListener("change", filterBirds));
            filterBirds();
        });

        return () => {
            let radios = document.querySelectorAll("input[type=radio][name=type]");
            radios.forEach((radio) => radio.removeEventListener("change", filterBirds));
            let checkboxes = document.querySelectorAll("input[type=checkbox][name=size]");
            checkboxes.forEach((checkbox) => checkbox.removeEventListener("change", filterBirds));
        };
    }, []);


    return (
        <div>
            <h1>Project <span>X</span></h1>
            <div data-layout="content list-filters">
                <form action="." method="GET" data-form="bird-filters">
                    <div data-section="options">
                        <fieldset data-set="bird-type">
                            <legend data-heading>Type of Bird</legend>
                            <div data-fieldstyle="inline button">
                                <div data-radio-type="oddbird">
                                    <input data-radio="input" type="radio" name="type" value="odd" id="type_1" />
                                    <label htmlFor="type_1" data-radio="option">
                                        <span className="label-text">OddBirds</span>
                                    </label>
                                </div>
                                <div data-radio-type="allbirds">
                                    <input data-radio="input" type="radio" name="type" value="All" id="type_2" defaultChecked />
                                    <label htmlFor="type_2" data-radio="option">
                                        <span className="label-text">All Birds</span>
                                    </label>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend data-heading>Bird Size</legend>
                            <div data-fieldstyle="checkbox list">
                                <label htmlFor="small">
                                    <input type="checkbox" name="size" value="small" id="small" />
                                    Small
                                </label>
                                <label htmlFor="medium">
                                    <input type="checkbox" name="size" value="medium" id="medium" />
                                    Medium
                                </label>
                                <label htmlFor="large">
                                    <input type="checkbox" name="size" value="large" id="large" />
                                    Large
                                </label>
                            </div>
                        </fieldset>
                        <noscript><input type="submit" /></noscript>
                    </div>

                    <div data-section="results">
                        <ul data-list="birds">
                            {projects.map((project) => (
                                <li key={project._id} data-item="bird" data-bird-size="medium" data-bird-type="all">
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectList;
