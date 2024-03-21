import { Component} from '@angular/core';
import { Blueprint} from '../blueprint';
import { BlueprintService } from '../blueprint.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-blueprints',
  templateUrl: './get-blueprints.component.html',
  styleUrl: './get-blueprints.component.css'
})
export class GetBlueprintsComponent{

  blueprints:Blueprint[];
  flagDiv:Boolean = false;
  author:string;
  amountOfPoints:number;
  name:string;
  blueprintName:string;
  blueprint:Blueprint;
  points: { x: number, y: number }[];

  constructor(private blueprintServices:BlueprintService,private router:Router){

  }

  //Method to send the petition for getting blueprints
  onSubmit(){
    if(this.author != undefined && this.author != ''){
      this.getBlueprintsByAuthor();
    }
    else{
      this.flagDiv = false;
    }
  }

  //Method to open the blueprint
  openBlueprint(name: string) {
    this.blueprintName = name;
    this.getBlueprintByNameandAuthor();
  }

  //Method to create a new Blueprint
  createNewBlueprint(){
    this.router.navigate(['/crear-blueprint']);
  }

  //Method to get the points
  askForPoints() {
    const points = window.prompt("Please enter the points in this way (x,y),(x,y):");
    if (points !== null && this.blueprintName!="") {
      const parsedPoints = this.parsePoints(points);
      if(parsedPoints){
        this.points = parsedPoints;
        this.updateBlueprint();
      }
    }
  }

  //Method to update the blueprint
  updateBlueprint(){
    try{
      this.blueprintServices.updateBlueprint(this.author,this.blueprintName,this.points).subscribe(data => {
        this.clearCanvas();
        this.getBlueprintsByAuthor();
        this.getBlueprintByNameandAuthor();
      });
    }catch (error) {
      console.log('Error in updateBlueprint:', error);
    }

  }
  
  //Method to delete a Blueprint
  deleteBlueprint(){
    try{
      this.blueprintServices.deleteBlueprint(this.author,this.blueprintName).subscribe(data => {
        this.clearCanvas();
        this.blueprintName ='';
        this.onSubmit();
      });
    }catch (error) {
      console.log('Error in createNewBlueprint:', error);
    }
  }

  //Set author name
  private setName(){
    this.name = this.author + "'s" + " " + "blueprints:"; 
  }

  //Set amount of total Amount of points
  private setAmountOfPoints(){
    this.amountOfPoints = this.blueprints.reduce((total, blueprint) => total + blueprint.amountOfPoints, 0);
  }

  //Get all blueprint's with the name author's
  private getBlueprintsByAuthor() {
    try {
      this.blueprintServices.getBlueprintsByAuthor(this.author).subscribe(data => {
        this.blueprints = data;
        this.setName();
        this.setAmountOfPoints();
        this.flagDiv = this.blueprints.length > 0;
      }, error => {
        console.log('Error en getBlueprintsByAuthor:', error);
        this.flagDiv = false;
      });
    } catch (error) {
      this.flagDiv = false;
    }
  }

  //Get the blueprint with the blueprint's name an author's name
  private getBlueprintByNameandAuthor() {
    try {
      this.blueprintServices.getBlueprintsByNameAndAuthor(this.author, this.blueprintName).subscribe(data => {
        this.blueprint = data;
        this.drawBlueprint(this.blueprint);
      });
    } catch (error) {
      console.log('Error en getBlueprintByNameandAuthor:', error);
    }
  }

  //Clean canvas
  private clearCanvas() {
    const canvas = document.getElementById('Canvas') as HTMLCanvasElement;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        console.error('Could not get 2D context from canvas');
      }
    } else {
      console.error('The canvas element could not be found');
    }
  }
  

  //Draw canvas 
  private drawBlueprint(blueprint: Blueprint | null | undefined) {
    if (!blueprint) {
      console.error('The blueprint is null or undefined');
      return;
    }
  
    const canvas = document.getElementById('Canvas') as HTMLCanvasElement;
    if (!canvas) {
      console.error('The canvas element could not be found');
      return;
    }
  
    const context = canvas.getContext('2d');
    if (!context) {
      console.error('Could not get 2D context from canvas');
      return;
    }
    
    //Clean the canvas beforte to draw
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    //Fix the syle of the lines
    context.strokeStyle = 'red';
    context.lineWidth = 2;
    
    //Draw the line
    for (let i = 0; i < blueprint.points.length - 1; i++) {
      const startPoint = blueprint.points[i];
      const endPoint = blueprint.points[i + 1];
      context.beginPath();
      context.moveTo(startPoint.x, startPoint.y);
      context.lineTo(endPoint.x, endPoint.y);
      context.stroke();
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
