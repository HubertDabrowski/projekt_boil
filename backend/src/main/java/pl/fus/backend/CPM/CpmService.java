package pl.fus.backend.CPM;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CpmService {
    public static int maxCost;
    public static String format = "%1$-10s %2$-5s %3$-5s %4$-5s %5$-5s %6$-5s %7$-10s\n";
    public List<Task> tasks = new ArrayList<>();

    public void calculate(TaskDTO[] tasksDto) {
        this.tasks.clear();
        for (int i = 0; i < tasksDto.length; i++) {
            if (tasksDto[i].getDependencies() == null)
                this.tasks.add(new Task(tasksDto[i].getName(), tasksDto[i].getCost()));
            else {
                this.tasks.add(new Task(tasksDto[i].getName(), tasksDto[i].getCost()));
                for (String s : tasksDto[i].getDependencies())
                    for (Task t : this.tasks)
                        if (t.getName().equals(s))
                            this.tasks.get(i).getDependencies().add(t);
            }
        }

        HashSet<Task> allTasks = new HashSet<>();
        allTasks.addAll(this.tasks);
        Task[] result = criticalPath(allTasks);
        print(result);
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
                if (completed.containsAll(task.getDependencies())) {
                    // all dependencies calculated, critical cost is max
                    // dependency
                    // critical cost, plus our cost
                    int critical = 0;
                    for (Task t : task.getDependencies()) {
                        if (t.getCriticalCost() > critical) {
                            critical = t.getCriticalCost();
                        }
                    }
                    task.setCriticalCost(critical + task.getCost());
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
                return o1.getName().compareTo(o2.getName());
            }
        });

        return ret;
    }

    public static void calculateEarly(HashSet<Task> initials) {
        for (Task initial : initials) {
            initial.setEarlyStart(0);
            initial.setEarlyFinish(initial.getCost());
            setEarly(initial);
        }
    }

    public static void setEarly(Task initial) {
        int completionTime = initial.getEarlyFinish();
        for (Task t : initial.getDependencies()) {
            if (completionTime >= t.getEarlyStart()) {
                t.setEarlyStart(completionTime);
                t.setEarlyFinish(completionTime + t.getCost());
            }
            setEarly(t);
        }
    }

    public static HashSet<Task> initials(Set<Task> tasks) {
        HashSet<Task> remaining = new HashSet<Task>(tasks);
        for (Task t : tasks) {
            for (Task td : t.getDependencies()) {
                remaining.remove(td);
            }
        }

        return remaining;
    }

    public static void maxCost(Set<Task> tasks) {
        int max = -1;
        for (Task t : tasks) {
            if (t.getCriticalCost() > max)
                max = t.getCriticalCost();
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
