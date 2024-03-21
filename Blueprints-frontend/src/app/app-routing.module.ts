import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetBlueprintsComponent } from './get-blueprints/get-blueprints.component';
import { CreateBlueprintComponent } from './create-blueprint/create-blueprint.component';


const routes: Routes = [
  {path:'blueprints',component:GetBlueprintsComponent},
  {path :'',redirectTo:'blueprints',pathMatch:'full'},
  {path: 'crear-blueprint',component:CreateBlueprintComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
