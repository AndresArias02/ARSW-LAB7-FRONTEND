import { Component } from '@angular/core';
import { BlueprintService } from '../blueprint.service';
import { Blueprint } from '../blueprint';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-blueprint',
  templateUrl: './create-blueprint.component.html',
  styleUrl: './create-blueprint.component.css'
})
export class CreateBlueprintComponent {

  blueprint: Blueprint = new Blueprint();
  pointsInput: string;

  constructor(private blueprintServices:BlueprintService,private router:Router){

  }

  //Method to send the petition for getting blueprints
  onSubmit(){
    //Convert the points
    const parsedPoints = this.parsePoints(this.pointsInput);
    if (parsedPoints) {
      this.blueprint.points = parsedPoints;
      this.blueprint.amountOfPoints = parsedPoints.length;
      this.createNewBlueprint();
      this.router.navigate(['/blueprints']);
    } else {
      console.log("Error: points are invalid.");
    }
  }

  private createNewBlueprint() {
    try {
      this.blueprintServices.createNewBlueprint(this.blueprint).subscribe(data => {
        console.log(data);
      });
    } catch (error) {
      console.log('Error in createNewBlueprint:', error);
    }
  }

 

  // Method to analyze and validate the points entered in the format ({x},{y})
  private parsePoints(pointsInput: string): { x: number, y: number }[] | null {
    try {
      // Remove the parentheses and divide the string by commas
      const pointsArray = pointsInput.replace(/[()]/g, '').split(',');
      // Validate if there are an even number of values
      if (pointsArray.length % 2 !== 0) {
        return null;
      }
      const parsedPoints: { x: number, y: number }[] = [];
      
      for (let i = 0; i < pointsArray.length; i += 2) {
        const x = parseFloat(pointsArray[i]);
        const y = parseFloat(pointsArray[i + 1]);

        // Verify the values are numbers
        if (!isNaN(x) && !isNaN(y)) {
          parsedPoints.push({ x, y });
        } else {
          return null;
        }
      }
      return parsedPoints;
    } catch (error) {
      return null; 
    }
  }

}

