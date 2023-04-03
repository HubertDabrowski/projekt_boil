package pl.fus.backend.CPM;

import jakarta.persistence.Embeddable;

import java.util.*;

public class CriticalPath {
    public static int maxCost;
    public static String format = "%1$-10s %2$-5s %3$-5s %4$-5s %5$-5s %6$-5s %7$-10s\n";

    public static void main(String[] args) {
        // The example dependency graph
        HashSet<Task> allTasks = new HashSet<>();
        Task start = new Task("A", 3);
        Task B = new Task("B", 4, start);
        Task C = new Task("C", 6, start);
        Task D = new Task("D", 7, B);
        Task E = new Task("E", 1, D);
        Task F = new Task("F", 2, C);
        Task G = new Task("G", 3, C);
        Task H = new Task("H", 4, G);
        Task I = new Task("I", 1, H);
        Task J = new Task("J", 2, I);
        allTasks.add(start);
        allTasks.add(B);
        allTasks.add(C);
        allTasks.add(D);
        allTasks.add(E);
        allTasks.add(G);
        allTasks.add(H);
        allTasks.add(I);
        allTasks.add(F);
        allTasks.add(J);

        Task[] result = criticalPath(allTasks);
        print(result);
//         System.out.println("Critical Path: " + Arrays.toString(result));
    }

    // A wrapper class to hold the tasks during the calculation
    public static class Task {
        // the actual cost of the task
        public int cost;
        // the cost of the task along the critical path
        public int criticalCost;
        // a name for the task for printing
        public String name;
        // the earliest start
        public int earlyStart;
        // the earliest finish
        public int earlyFinish;
        // the latest start
        public int latestStart;
        // the latest finish
        public int latestFinish;
        // the tasks on which this task is dependant
        public Set<Task> dependencies = new HashSet<>();

        public Task(String name, int cost, Task... dependencies) {
            this.name = name;
            this.cost = cost;
            for (Task t : dependencies) {
                System.out.println(name + " and dependencies " + t.name);
                this.dependencies.add(t);
            }
            this.earlyFinish = -1;
        }

        public void setLatest() {
            latestStart = maxCost - criticalCost;
            latestFinish = latestStart + cost;
        }

        public String[] toStringArray() {
            String criticalCond = earlyStart == latestStart ? "Yes" : "No";
            String[] toString = {name, earlyStart + "", earlyFinish + "", latestStart + "", latestFinish + "",
                    latestStart - earlyStart + "", criticalCond};
            return toString;
        }

    }

    public static Task[] criticalPath(Set<Task> tasks) {
        // tasks whose critical cost has been calculated
        HashSet<Task> completed = new HashSet<>();
        // tasks whose critical cost needs to be calculated
        HashSet<Task> remaining = new HashSet<>(tasks);

        // Backflow algorithm
        // while there are tasks whose critical cost isn't calculated.
        while (!remaining.isEmpty()) {
            boolean progress = false;

            // find a new task to calculate
            for (Iterator<Task> it = remaining.iterator(); it.hasNext(); ) {
                Task task = it.next();
                if (completed.containsAll(task.dependencies)) {
                    // all dependencies calculated, critical cost is max
                    // dependency
                    // critical cost, plus our cost
                    int critical = 0;
                    for (Task t : task.dependencies) {
                        if (t.criticalCost > critical) {
                            critical = t.criticalCost;
                        }
                    }
                    task.criticalCost = critical + task.cost;
                    // set task as calculated an remove
                    completed.add(task);
                    it.remove();
                    // note we are making progress
                    progress = true;
                }
            }
            // If we haven't made any progress then a cycle must exist in
            // the graph and we wont be able to calculate the critical path
            if (!progress)
                throw new RuntimeException("Cyclic dependency, algorithm stopped!");
        }

        // get the cost
        maxCost(tasks);
        HashSet<Task> initialNodes = initials(tasks);
        calculateEarly(initialNodes);

        // get the tasks
        Task[] ret = completed.toArray(new Task[0]);
        // create a priority list
        Arrays.sort(ret, new Comparator<Task>() {

            @Override
            public int compare(Task o1, Task o2) {
                return o1.name.compareTo(o2.name);
            }
        });

        return ret;
    }

    public static void calculateEarly(HashSet<Task> initials) {
        for (Task initial : initials) {
            initial.earlyStart = 0;
            initial.earlyFinish = initial.cost;
            setEarly(initial);
        }
    }

    public static void setEarly(Task initial) {
        int completionTime = initial.earlyFinish;
        for (Task t : initial.dependencies) {
            if (completionTime >= t.earlyStart) {
                t.earlyStart = completionTime;
                t.earlyFinish = completionTime + t.cost;
            }
            setEarly(t);
        }
    }

    public static HashSet<Task> initials(Set<Task> tasks) {
        HashSet<Task> remaining = new HashSet<Task>(tasks);
        for (Task t : tasks) {
            for (Task td : t.dependencies) {
                remaining.remove(td);
            }
        }

        System.out.print("Initial nodes: ");
        for (Task t : remaining)
            System.out.print(t.name + " ");
        System.out.print("\n\n");
        return remaining;
    }

    public static void maxCost(Set<Task> tasks) {
        int max = -1;
        for (Task t : tasks) {
            if (t.criticalCost > max)
                max = t.criticalCost;
        }
        maxCost = max;
        System.out.println("Critical path length (cost): " + maxCost);
        for (Task t : tasks) {
            t.setLatest();
        }
    }

    public static void print(Task[] tasks) {
        System.out.format(format, "Task", "ES", "EF", "LS", "LF", "Slack", "Critical?");
        for (Task t : tasks)
            System.out.format(format, (Object[]) t.toStringArray());
    }
}