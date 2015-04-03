**What's a POJO?**

A POJO is a Plain Old Java Object. Here's an example of a Friend class that could represent a user on a social network:

```java
public class Friend {
    public String name;
    public int mutualFriendCount;
    public Date birthday;
}
```

**What is Jackson?**

Jackson is a Java library that can be used to parse JSON into POJOs. Jackson makes it easy for you to take incoming data, turn it into Java objects, and spend less time working out the details.

**Why should I use this?**

You should use this if you need to parse JSON data from the internet but have no idea where to start. Jackson is the easiest way to get started working with JSON in Java.

**How do I use this?**

Put the JSON you expect to receive into the box on the left, then click Compile. The generated POJOs will appear below. You can download the Java classes and copy them into your project.

**What does Parcelable mean?**

The Android framework has an interface called **Parcelable**. Android requires Java objects to implement the Parcelable interface before Activities can pass the objects around.

If you're parsing JSON in Android, check the "Make Parcelable for Android apps" box and we'll make your POJOs work with [the Parceler library](https://github.com/johncarl81/parceler).
