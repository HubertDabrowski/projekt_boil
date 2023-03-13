package pl.fus.backend.CPM;

import java.util.List;

public class Project {
//    public static int maxCost;
//    public static String format = "%1$-10s %2$-5s %3$-5s %4$-5s %5$-5s %6$-5s %7$-10s\n";

    private List<CpmActivity> listOfActivities;

    @Override
    public String toString() {
        return "Project{" +
                "listOfActivities=" + listOfActivities +
                '}';
    }
}
