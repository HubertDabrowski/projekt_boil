package pl.fus.backend.CPM;

import jakarta.persistence.Embeddable;

import java.util.List;
@Embeddable
public class Project {

    private List<Integer> listOfActivities;

    public Project() {
    }

    public Project(List<Integer> listOfActivities) {
        this.listOfActivities = listOfActivities;
    }

    @Override
    public String toString() {
        return "Project{" +
                "listOfActivities=" + listOfActivities +
                '}';
    }
}
