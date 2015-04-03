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

Put the JSON you expect to receive into the box on the left, then click Compile. The generated POJOs will appear below, and you can download them and copy them into your project.

**What does Parcelable mean?**

The Android framework has an interface called Parcelable. This interface provides a very fast way for objects to serialize themselves to and deserialize themselves from a stream of bytes rapidly and efficiently.

Android requires Java objects to implement the Parcelable interface before Activities can pass the objects around.
